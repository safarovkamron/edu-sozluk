'use client'

import { FireworksBackground } from '@/components/animate-ui/components/backgrounds/fireworks'
import { CountingNumber } from '@/components/animate-ui/primitives/texts/counting-number'
import { Button } from '@/components/ui/button'
import { Share2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface GameResultPageProps {
	level?: string
	unit?: string
	correct?: number
	wrong?: number
	time?: number
	status?: string
}

export default function GameResultPage({
	level,
	unit,
	correct = 0,
	wrong = 0,
	time = 0,
	status,
}: GameResultPageProps) {
	const router = useRouter()

	const minutes = Math.floor(time / 60)
	const seconds = time % 60
	const total = correct + wrong
	const percent = total ? Math.round((correct / total) * 100) : 0

	const handleRetry = () => {
		router.push(`/game?level=${level}&unit=${unit}`)
	}

	const handleHome = () => {
		router.push('/')
	}

	const shareTg = () => {
		const minutes = Math.floor(time / 60)
		const seconds = time % 60

		const statusText =
			status === 'completed' ? '✅ Tugallandi' : '⚠️ Erta tugatildi'

		const shareText = `🎮 Edu Sozluk Game Natijasi

📘 Daraja: ${level}
📖 Unit: ${unit}

✔️ To'g'ri: ${correct}
❌ Noto'g'ri: ${wrong}
⏱ Vaqt: ${minutes}m ${seconds}s
📈 Natija: ${percent}%
📊 Status: ${statusText}

🔥 Sen ham sinab ko'r!`

		const url = window.location.origin

		const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareText)}`

		window.open(telegramUrl, '_blank')
	}

	return (
		<div className='relative min-h-full flex flex-col items-center justify-center overflow-hidden p-6'>
			<div className='absolute inset-0 z-0'>
				<FireworksBackground />
			</div>

			<div className='flex-1 flex flex-col items-center justify-center gap-6 z-10'>
				<h1 className='text-3xl font-bold text-center'>O`yin natijasi</h1>
				<p className='text-lg text-center'>
					Daraja: <strong>{level}</strong> | Unit: <strong>{unit}</strong>
				</p>

				<div className='flex flex-col gap-2 text-center'>
					<div>
						To`g`ri javoblar: ✔
						<CountingNumber number={correct} className='text-semibold' />
					</div>
					<div>
						Noto`g`ri javoblar: ❌{' '}
						<CountingNumber number={wrong} className='text-semibold' />
					</div>
					<p>
						O`tkazilgan vaqt:{' '}
						<strong>
							⏲ {minutes}m {seconds}s
						</strong>
					</p>
					<p>
						Status:{' '}
						<strong>
							{status === 'completed' ? 'Tugallandi' : 'Erta tugatildi'}
						</strong>
					</p>
				</div>

				<div className='flex gap-4 mt-4'>
					<Button
						onClick={handleRetry}
						variant={'outline'}
						className='cursor-pointer'
					>
						Takrorlash
					</Button>
					<Button onClick={handleHome} className='cursor-pointer'>
						Bosh sahifa
					</Button>
					<Button
						onClick={shareTg}
						variant={'outline'}
						className='cursor-pointer'
					>
						<Share2 />
					</Button>
				</div>
			</div>
		</div>
	)
}
