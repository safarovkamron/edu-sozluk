'use client'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { wordsUnit1 } from '@/constants'
import { IGameConfig, IRound } from '@/types/game.types'
import { Card } from '@/types/ui.types'
import { House } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
import { generateGame, shuffle } from '../utils/lib'

interface GamePageProps {
	searchParams: {
		level?: string
		unit?: string
	}
}

export default function GamePage({ searchParams }: GamePageProps) {
	const router = useRouter()
	const level = searchParams.level
	const unit = searchParams.unit

	const TOTAL_TIME = 300
	const [timeLeft, setTimeLeft] = useState(TOTAL_TIME)
	const [isGameFinished, setIsGameFinished] = useState(false)
	const [mode, setMode] = useState<'sequential' | 'random'>('random')
	const [from, setFrom] = useState<number | undefined>(undefined)
	const [to, setTo] = useState<number | undefined>(undefined)
	const [sessionRounds, setSessionRounds] = useState<IRound[]>([])
	const [currentRoundIndex, setCurrentRoundIndex] = useState(0)
	const [selectedCards, setSelectedCards] = useState<Card[]>([])
	const [correctCards, setCorrectCards] = useState<number[]>([])
	const [wrongCards, setWrongCards] = useState<Card[]>([])
	const [correct, setCorrect] = useState(0)
	const [wrong, setWrong] = useState(0)
	const [gameStarted, setGameStarted] = useState(false)
	const timerRef = useRef<NodeJS.Timeout | null>(null)

	const finishGame = () => {
		if (isGameFinished) return

		setIsGameFinished(true)

		if (timerRef.current) {
			clearInterval(timerRef.current)
		}

		const timeSpent = TOTAL_TIME - timeLeft

		const params = new URLSearchParams({
			level: level || '',
			unit: unit || '',
			correct: correct.toString(),
			wrong: wrong.toString(),
			time: timeSpent.toString(),
			status: 'completed',
		})

		router.push(`/game/result?${params.toString()}`)
	}

	const words = useMemo(() => {
		if (!level || !unit) return []

		switch (level) {
			case 'a1':
				if (unit === 'unit1') return wordsUnit1
				break
		}

		return []
	}, [level, unit])

	useEffect(() => {
		if (!gameStarted) return

		timerRef.current = setInterval(() => {
			setTimeLeft(prev => {
				if (prev <= 1) {
					clearInterval(timerRef.current!)
					finishGame()
					return 0
				}
				return prev - 1
			})
		}, 1000)

		return () => {
			if (timerRef.current) {
				clearInterval(timerRef.current)
			}
		}
	}, [gameStarted])

	if (!level || !unit) {
		return <p className='text-center mt-20'>Daraja va unit tanlanishi shart!</p>
	}

	const startGame = () => {
		const config: IGameConfig = { mode, from, to, pairsPerRound: 6 }
		const rounds = generateGame(words, config)
		setSessionRounds(rounds)
		setCurrentRoundIndex(0)
		setSelectedCards([])
		setCorrectCards([])
		setWrongCards([])
		setCorrect(0)
		setWrong(0)
		setGameStarted(true)
	}

	const currentRound = sessionRounds[currentRoundIndex]

	const handleSelectCard = (card: Card) => {
		if (
			selectedCards.find(
				c => c.id === card.id && c.text === card.text && c.lang == card.lang,
			) ||
			correctCards.includes(card.id)
		)
			return

		const newSelected = [...selectedCards, card]
		setSelectedCards(newSelected)

		if (newSelected.length === 2) {
			const [c1, c2] = newSelected

			if (c1.id === c2.id) {
				setCorrect(prev => prev + 1)
				setCorrectCards(prev => [...prev, c1.id])
			} else {
				const allPairCards = currentRound.cards.filter(
					card => card.id === c1.id || card.id === c2.id,
				)

				setWrong(prev => prev + 1)
				setWrongCards(prev => {
					const existingKeys = new Set(prev.map(card => card.id + card.text))
					const uniqueNew = allPairCards.filter(
						card => !existingKeys.has(card.id + card.text),
					)
					return [...prev, ...uniqueNew]
				})
			}

			setTimeout(() => {
				setSelectedCards([])

				const allPairsSelected = currentRound.cards.every(
					card => correctCards.includes(card.id) || newSelected.includes(card),
				)
				if (allPairsSelected) {
					nextRound()
				}
			}, 300)
		}
	}

	const nextRound = () => {
		if (!currentRound) return

		const updatedRounds = sessionRounds.map((round, idx) =>
			idx === currentRoundIndex ? { ...round, completed: true } : round,
		)

		if (currentRound.wrongPairs?.length) {
			updatedRounds.push({
				roundNumber: updatedRounds.length + 1,
				cards: shuffle(currentRound.wrongPairs),
				completed: false,
			})
		} else if (
			wrongCards.length > 0 &&
			currentRoundIndex === sessionRounds.length - 1
		) {
			updatedRounds.push({
				roundNumber: updatedRounds.length + 1,
				cards: shuffle(wrongCards),
				completed: false,
			})
			setWrongCards([])
		}

		setSessionRounds(updatedRounds)
		setCorrectCards([])
		setCurrentRoundIndex(prev => prev + 1)

		const isLastRound =
			currentRoundIndex === sessionRounds.length - 1 &&
			wrongCards.length === 0 &&
			!currentRound.wrongPairs?.length
		if (isLastRound) finishGame()
	}

	const exitGame = () => {
		if (timerRef.current) {
			clearInterval(timerRef.current)
		}

		const totalTime = 300
		const timeSpent = totalTime - timeLeft

		const params = new URLSearchParams({
			level: level || '',
			unit: unit || '',
			correct: correct.toString(),
			wrong: wrong.toString(),
			time: timeSpent.toString(),
			status: 'early',
		})

		router.push(`/game/result?${params.toString()}`)
	}

	return (
		<div className='h-full flex flex-col items-center justify-start p-6 gap-6'>
			{!gameStarted && (
				<div className='flex flex-col gap-4 max-w-md w-full'>
					<h2 className='text-2xl font-bold text-center'>
						Rejim va interval tanlang
					</h2>

					<div className='mt-2 flex flex-col gap-2'>
						<Label htmlFor='game-mode'>Rejim:</Label>
						<Select
							value={mode}
							onValueChange={v => setMode(v as 'random' | 'sequential')}
						>
							<SelectTrigger className='w-full' id='game-mode'>
								<SelectValue placeholder='Mode' />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value='random'>Random</SelectItem>
									<SelectItem value='sequential'>Ketma ketlikda</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>

					<div className='flex flex-col gap-2'>
						<p>Interval:</p>
						<div className='flex gap-2'>
							<Input
								type='number'
								min={1}
								max={words.length - 10}
								placeholder='Dan'
								className='border p-2 rounded w-1/2'
								value={from ?? ''}
								onChange={e => setFrom(Number(e.target.value) || undefined)}
							/>
							<Input
								type='number'
								placeholder='Gacha'
								min={10}
								max={words.length}
								className='border p-2 rounded w-1/2'
								value={to ?? ''}
								onChange={e => setTo(Number(e.target.value) || undefined)}
							/>
						</div>
						<p className='text-gray-500 '>
							Interval tanlanmagan taqdirda barcha so`zlar olinadi*
						</p>
					</div>

					<Button onClick={startGame} className='cursor-pointer'>
						Boshlash
					</Button>
					<Button
						variant={'outline'}
						className='cursor-pointer'
						onClick={() => router.push('/')}
					>
						<House />
						Bosh sahifa
					</Button>
				</div>
			)}

			{gameStarted && !isGameFinished && currentRound && (
				<div className='flex flex-col items-center justify-between gap-4 max-w-md w-full h-full'>
					<div className='flex flex-col items-center gap-4 max-w-md w-full'>
						<h2 className='text-xl font-bold'>
							Round {currentRound.roundNumber} / {sessionRounds.length}
						</h2>

						<div className='grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4'>
							{currentRound.cards.map((card, idx) => {
								const isSelected = selectedCards.includes(card)
								const isCorrect = correctCards.includes(card.id)

								return (
									<button
										key={card.id + card.text + `${idx}`}
										onClick={() => handleSelectCard(card)}
										disabled={isCorrect}
										className={`
          border rounded-xl
          p-5 sm:p-4
          text-base sm:text-base md:text-sm
          min-h-[70px] sm:min-h-[60px]
          font-medium
          transition-all duration-200
          active:scale-95
          ${isCorrect ? 'bg-green-300 cursor-default' : ''}
          ${isSelected && !isCorrect ? 'bg-blue-300' : ''}
          ${selectedCards.length === 2 && selectedCards.includes(card) && !isCorrect ? 'bg-red-300' : ''}
        `}
									>
										{card.text}
									</button>
								)
							})}
						</div>
						<p className='text-gray-500 text-xs w-full text-left'>
							O`yin so`ngida natijani oling va do`stlarga ulashing*
						</p>
					</div>

					<div className='flex flex-col w-full'>
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button variant={'destructive'} className='cursor-pointer'>
									Tugatish
								</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>
										O`yinni tugatishni hohlaysizmi?
									</AlertDialogTitle>
									<AlertDialogDescription>
										Tugatilgandan so`ng o`yin natijalari bilan tanishishingiz
										mumkin!
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel className='cursor-pointer'>
										Yo`q
									</AlertDialogCancel>
									<AlertDialogAction
										variant={'destructive'}
										className='cursor-pointer'
										onClick={exitGame}
									>
										Ha
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</div>
				</div>
			)}
		</div>
	)
}
