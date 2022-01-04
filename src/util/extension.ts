export function Extension(image: string) {
  switch (image.substring(0, 5)) {
    case 'iVBOR':
      return 'data:image/png;base64,' + image
    case 'R0IGO':
      return 'data:image/gif;base64,' + image
    case '/9j/4':
      return 'data:image/jpeg;base64,' + image
    default:
      return ''
  }
}
