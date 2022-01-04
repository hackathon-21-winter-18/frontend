export function calcTimeDiff(iso: string) {
  let now = new Date()
  let isoDate = new Date(Date.parse(iso))
  let diffTime = now.getTime() - isoDate.getTime()
  let diffTimeHour = Math.floor(diffTime / (60 * 1000))
  if (diffTimeHour < 60) {
    return diffTimeHour + '分前'
  } else if (diffTimeHour < 24 * 60) {
    return Math.floor(diffTimeHour / 60) + '時間前'
  } else {
    return Math.floor(diffTimeHour / (24 * 60)) + '日前'
  }
}
