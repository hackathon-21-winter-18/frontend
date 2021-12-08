//PalaceType
type EmbededPins = {
	number: number
	x: number
	y: number
	word: string
	memo: string
}

export type PalaceType = {
	id: string
	name: string
	image: string
	embededPins: EmbededPins[]
}
//TemplateType
type Pins = {
	number: number
	x: number
	y: number
}

export type TemplateType = {
	id: string
	name: string
	image: string
	pins: Pins[]
	createdBy: string
}
