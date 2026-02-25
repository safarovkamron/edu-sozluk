'use client'

import { useEffect, useRef, useState } from 'react'

const greetings = {
	tr: {
		title: 'Hoş geldiniz!',
		desc: 'Türkçe kelimeleri eğlenceli bir şekilde öğrenin.',
	},
	uz: {
		title: 'Xush kelibsiz!',
		desc: "Turkcha so'zlarni qiziqarli tarzda o'rganing.",
	},
}

function Header() {
	const [title, setTitle] = useState('')
	const [desc, setDesc] = useState('')
	const [language, setLanguage] = useState<'tr' | 'uz'>('tr')

	const titleIndex = useRef(0)
	const descIndex = useRef(0)
	const phase = useRef<'title' | 'desc'>('title')

	useEffect(() => {
		const current = greetings[language]

		const interval = setInterval(() => {
			if (phase.current === 'title') {
				if (titleIndex.current < current.title.length) {
					titleIndex.current++
					setTitle(current.title.slice(0, titleIndex.current))
				} else {
					phase.current = 'desc'
				}
			} else {
				if (descIndex.current < current.desc.length) {
					descIndex.current++
					setDesc(current.desc.slice(0, descIndex.current))
				} else {
					clearInterval(interval)

					if (language === 'tr') {
						setTimeout(() => {
							titleIndex.current = 0
							descIndex.current = 0
							phase.current = 'title'
							setTitle('')
							setDesc('')
							setLanguage('uz')
						}, 1000)
					}
				}
			}
		}, 40)

		return () => clearInterval(interval)
	}, [language])

	return (
		<div className='flex flex-col items-center gap-4'>
			<h1 className='text-3xl font-bold'>
				{title}
				<span className='animate-pulse'>|</span>
			</h1>

			<p className='text-gray-500 text-center max-w-md min-h-12'>{desc}</p>
		</div>
	)
}

export default Header
