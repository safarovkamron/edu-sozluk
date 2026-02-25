import { Metadata } from 'next'
import GameResultPage from './components/result-client'

export async function generateMetadata({
	searchParams,
}: {
	searchParams: Record<string, string | undefined>
}): Promise<Metadata> {
	const level = searchParams.level || "Noma'lum"
	const unit = searchParams.unit || ''
	const correct = searchParams.correct || '0'
	const wrong = searchParams.wrong || '0'
	const time = searchParams.time || '0'

	const title = `O'yin natijasi: ${level} ${unit}`
	const description = `To'g'ri: ${correct}, Noto'g'ri: ${wrong}, Vaqt: ${Math.floor(Number(time) / 60)}m ${Number(time) % 60}s`

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

export default function ResultPage({
	searchParams,
}: {
	searchParams: Record<string, string | undefined>
}) {
	const level = searchParams.level
	const unit = searchParams.unit
	const correct = searchParams.correct ? Number(searchParams.correct) : 0
	const wrong = searchParams.wrong ? Number(searchParams.wrong) : 0
	const time = searchParams.time ? Number(searchParams.time) : 0
	const status = searchParams.status

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
