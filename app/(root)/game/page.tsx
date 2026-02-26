import GamePage from './components/game-client'

export default async function GameServerPage({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | undefined }>
}) {
	const params = await searchParams

	return <GamePage searchParams={params} />
}
