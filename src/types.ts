//PalaceType
export type EmbededPin = {
  number: number
  x: number
  y: number
  word: string
  place: string
  situation: string
  groupNumber: number
}

export type PalaceType = {
  id: string
  name: string
  image: string
  embededPins: EmbededPin[]
  share: boolean
  savedCount: number
  createdBy: string
  group1: string
  group2: string
  group3: string
}
//TemplateType
export type Pin = {
  number: number
  x: number
  y: number
  groupNumber: number
}
export type PinContent = {
  word: string
  place: string
  situation: string
  groupNumber: number
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
  editorName: string
  creatorName: string
  heldBy: string
  createdBy: string
  group1: string
  group2: string
  group3: string
}
//SharedTemplateType
export type SharedTemplateType = {
  id: string
  name: string
  image: string
  pins: Pin[]
  savedCount: number
  editorName: string
  creatorName: string
  heldBy: string
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

export type NoticeType = {
  id: string
  checked: boolean
  content: string
  created_at: string
  palaceID: string
  templateID: string
}
