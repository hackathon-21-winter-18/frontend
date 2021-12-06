//PalaceType
type EmbededPins = {
	number: string
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
//TemplateType
type Pins = {
	number: string
	x: Number
	y: Number
}

export type TemplateType = {
	id: string
	name: string
	image: string
	pins: Pins[]
	createdBy: string
}
