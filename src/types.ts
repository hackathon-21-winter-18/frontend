//PalaceType
type EmbededPins = {
  number: number
  x: number
  y: number
  word: string
  place: string
  do: string
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
}
export type UserRegistration = {
  name: string
  password: string
}
export type RegistrationResponse = {
  id: string
  name: string
}
