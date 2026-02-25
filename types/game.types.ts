import { Card } from './ui.types'

export interface IRound {
	roundNumber: number
	cards: Card[]
	completed: boolean
	wrongPairs?: Card[]
}

export interface IGameConfig {
	mode: 'sequential' | 'random'
	from?: number
	to?: number
	pairsPerRound: number
}