import enLocale from '../locales/en.json'

export function formatDate(isoStringDate: Date | string) {
  const date = new Date(isoStringDate)
  const day = date.getDate()
  const monthName = enLocale.months[date.getMonth()]
  const year = date.getFullYear()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${day} ${monthName} ${year}, ${hours}:${minutes}`
}
