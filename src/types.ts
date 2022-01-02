//PalaceType
export type EmbededPin = {
  number: number
  x: number
  y: number
  word: string
  place: string
  situation: string
}

export type PalaceType = {
  id: string
  name: string
  image: string
  embededPins: EmbededPin[]
  share: boolean
  savedCount: number
  createdBy: string
}
//TemplateType
export type Pin = {
  number: number
  x: number
  y: number
}
export type PinContent = {
  word: string
  place: string
  situation: string
}

export type TemplateType = {
  id: string
  name: string
  image: string
  pins: Pin[]
  share: boolean
  savedCount: number
  createdBy: string
}
//SharedPalaceType
export type SharedPalaceType = {
  id: string
  name: string
  image: string
  embededPins: EmbededPin[]
  savedCount: number
  createrName: string
  createdBy: string
}
//SharedTemplateType
export type SharedTemplateType = {
  id: string
  name: string
  image: string
  pins: Pin[]
  savedCount: number
  createrName: string
  createdBy: string
}
//login周り
export type UserRegistration = {
  name: string
  password: string
}
export type RegistrationResponse = {
  id: string
  name: string
  unreadNotices: number
}
