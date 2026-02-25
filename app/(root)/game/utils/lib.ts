import { IGameConfig, IRound } from '@/types/game.types'
import { Card, Word } from '@/types/ui.types'

export function shuffle<T>(array: T[]): T[] {
	const arr = [...array]
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[arr[i], arr[j]] = [arr[j], arr[i]]
	}
	return arr
}

export function filterWords(words: Word[], from?: number, to?: number) {
	if (!from || !to) return words
	return words.filter(w => w.id >= from && w.id <= to)
}

export function generateRound(words: Word[], pairsCount: number) {
	const selected = words.slice(0, pairsCount)
	const cards: Card[] = []
	selected.forEach(w => {
		cards.push({ id: w.id, text: w.tr })
		cards.push({ id: w.id, text: w.uz })
	})
	return shuffle(cards)
}

export function generateGame(words: Word[], config: IGameConfig) {
	const filtered = filterWords(words, config.from, config.to)
	const ordered = config.mode === 'random' ? shuffle(filtered) : filtered

	const rounds: IRound[] = []
	for (let i = 0; i < ordered.length; i += config.pairsPerRound) {
		const pairs = ordered.slice(i, i + config.pairsPerRound)
		rounds.push({
			roundNumber: rounds.length + 1,
			cards: generateRound(pairs, pairs.length),
			completed: false,
		})
	}
	return rounds
}
