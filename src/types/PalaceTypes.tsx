type EmbededPins = {
	id: string
	x: number
	y: number
	word: string
	memo: string
}

export type PalaceType = {
	id: string
	name: string
	image: any
	embededPins: EmbededPins[]
}
