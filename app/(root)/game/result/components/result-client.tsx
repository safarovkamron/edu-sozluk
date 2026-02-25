'use client'

import { FireworksBackground } from '@/components/animate-ui/components/backgrounds/fireworks'
import { Button } from '@/components/ui/button'
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

	const handleRetry = () => {
		router.push(`/game?level=${level}&unit=${unit}`)
	}

	const handleHome = () => {
		router.push('/')
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
					<p>
						To`g`ri javoblar: <strong>{correct}</strong>
					</p>
					<p>
						Noto`g`ri javoblar: <strong>{wrong}</strong>
					</p>
					<p>
						O`tkazilgan vaqt:{' '}
						<strong>
							{minutes}m {seconds}s
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
					<Button onClick={handleHome}>Bosh sahifa</Button>
				</div>
			</div>
		</div>
	)
}
