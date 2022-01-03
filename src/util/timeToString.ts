export function timeToString(time: string) {
  let returnString = ''
  returnString += time.split('-')[0] + '年' + time.split('-')[1] + '月' + time.split('-')[2].substring(0, 2) + '日'
  returnString += time.split('T')[1].split('.')[0]
  return returnString
}
