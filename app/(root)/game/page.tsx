import type { Metadata } from 'next'
import GamePage from './components/game-client'

export async function generateMetadata({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | undefined }>
}): Promise<Metadata> {
	const params = await searchParams

	const level = params.level || 'unknown'
	const unit = params.unit || ''

	const title = `O‘yin: ${level} ${unit}`
	const description = `${level} ${unit} uchun interaktiv lug‘at o‘yini. So‘z juftliklarini toping va tezlikni sinang.`

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: 'website',
			url: `/game?level=${level}&unit=${unit}`,
			siteName: 'Sözlük',
			images: [
				{
					url: '/og-game.jpg',
					width: 1200,
					height: 630,
					alt: `Sözlük Game ${level} ${unit}`,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: ['/og-game.jpg'],
		},
		alternates: {
			canonical: `/game?level=${level}&unit=${unit}`,
		},
	}
}

export default async function GameServerPage({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | undefined }>
}) {
	const params = await searchParams

	return <GamePage searchParams={params} />
}
