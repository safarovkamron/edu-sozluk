import { Metadata } from 'next'
import GameResultPage from './components/result-client'

export async function generateMetadata({
	searchParams,
}: {
	searchParams: Promise<Record<string, string | undefined>>
}): Promise<Metadata> {
	const params = await searchParams

	const level = params.level || "Noma'lum"
	const unit = params.unit || ''
	const correct = params.correct || '0'
	const wrong = params.wrong || '0'
	const time = params.time || '0'

	const title = `O'yin natijasi: ${level} ${unit}`
	const description = `To'g'ri: ${correct}, Noto'g'ri: ${wrong}, Vaqt: ${Math.floor(
		Number(time) / 60,
	)}m ${Number(time) % 60}s`

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: 'website',
			siteName: 'Edu Sozluk Game',
			images: [
				{
					url: '/result.jpg',
					width: 1200,
					height: 630,
					alt: 'Edu Sozluk Game Result',
				},
			],
		},
	}
}

export default async function ResultPage({
	searchParams,
}: {
	searchParams: Promise<Record<string, string | undefined>>
}) {
	const params = await searchParams

	const level = params.level
	const unit = params.unit
	const correct = params.correct ? Number(params.correct) : 0
	const wrong = params.wrong ? Number(params.wrong) : 0
	const time = params.time ? Number(params.time) : 0
	const status = params.status

	return (
		<GameResultPage
			level={level}
			unit={unit}
			correct={correct}
			wrong={wrong}
			time={time}
			status={status}
		/>
	)
}
