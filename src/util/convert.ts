export const getBase64 = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    let base64 = ''
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      base64 = reader.result?.toString()!
      resolve(base64)
    }
  })
}
