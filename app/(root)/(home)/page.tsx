'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import Header from './components/header'

import {
	FlipButton,
	FlipButtonBack,
	FlipButtonFront,
} from '@/components/animate-ui/components/buttons/flip'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

export default function HomePage() {
	const router = useRouter()

	const [level, setLevel] = useState<string>('')
	const [unit, setUnit] = useState<string>('')

	const handleStart = () => {
		if (!level || !unit) return
		router.push(`/game?level=${level}&unit=${unit}`)
	}

	return (
		<div className='h-full w-full flex items-center justify-center px-4'>
			<div className='w-full max-w-md flex flex-col items-center gap-8'>
				<Header />

				<div className='w-full flex flex-col gap-4'>
					<Select value={level} onValueChange={setLevel}>
						<SelectTrigger className='w-full'>
							<SelectValue placeholder='Seviye tanlang / Darajani tanlang' />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectItem value='a1'>A1</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>

					<Select value={unit} onValueChange={setUnit}>
						<SelectTrigger className='w-full'>
							<SelectValue placeholder='Ünite tanlang / Unitni tanlang' />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectItem value='unit1'>Unit 1</SelectItem>
								<SelectItem value='unit2'>Unit 2</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>

					{unit && level && (
						<div className='flex w-full items-center justify-center'>
							<FlipButton className='cursor-pointer ' onClick={handleStart}>
								<FlipButtonFront className='w-30'>Başla</FlipButtonFront>
								<FlipButtonBack variant={'link'} className='w-30'>
									Boshlash
								</FlipButtonBack>
							</FlipButton>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
