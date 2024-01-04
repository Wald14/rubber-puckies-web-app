export default function convertToUTC(date) {
  const enteredDate = new Date(date)
  const utcDate = new Intl.DateTimeFormat('en-US', {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }).format(enteredDate);
  const convertedDate = new Date(utcDate).toISOString()
  return (convertedDate)
}