export function convertToUTC(localDate) {
  const enteredDate = new Date(localDate)
  // const utcDate = new Intl.DateTimeFormat('en-US', {
  //   timeZone: 'UTC',
  //   year: 'numeric',
  //   month: 'numeric',
  //   day: 'numeric',
  //   hour: 'numeric',
  //   minute: 'numeric',
  //   second: 'numeric',
  // });
  // const convertedDate = new Date(utcDate).toISOString()
  // console.log("converted Date:", convertedDate)
  const utcTime = enteredDate.toISOString();
  return (utcTime)
}

export function convertUTCtoLocal(utcDateString) {
  const utcDate = new Date(utcDateString);
  if (isNaN(utcDate.getTime())) {
    console.error("Invalid Date:", utcDateString)
    return null;
  }
  const localDate = new Date(utcDate.getTime() - (utcDate.getTimezoneOffset() * 60 * 1000))
  return localDate
}

export function convertUTCtoCT(utcDateString) {
  const utcDate = new Date(utcDateString)
  const ctDate = utcDate.toLocaleString('en-US', {timeZone: 'America/Chicago'})
  return ctDate
}


export function grabDateFromISO(isoString) {
  const date = new Date(isoString)
  if (isNaN(date.getTime())) {
    console.error("Invalid Date:", utcDateString)
    return null;
  }
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`;
}

export function grabTimeFromISO(isoString) {
  const date = new Date(isoString)
  if (isNaN(date.getTime())) {
    console.error("Invalid Date:", utcDateString)
    return null;
  }
  let period = 'AM'

  let hour = date.getHours()
  if (hour >= 12) {
    period = 'PM'
    if (hour > 12) {
      hour -= 12
    }
  }
  if (hour === 0) {
    hour = 12
  }

  const hourString = String(hour)
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${hourString}:${minutes} ${period}`;
}


// Split Date
export function splitDateApart(incomingDate) {
  const date = new Date(incomingDate)
  return {
    year: date.getFullYear()
  }
}