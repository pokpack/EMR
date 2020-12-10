import crypto from './crypto'
import fsmanager from './fsmanager'
const timeDifference = (date1, date2, index) => {
  const difference_init = date1.getTime() - date2.getTime();
  let difference = difference_init
  let daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
  difference -= daysDifference * 1000 * 60 * 60 * 24

  let hoursDifference = Math.floor(difference / 1000 / 60 / 60);
  difference -= hoursDifference * 1000 * 60 * 60

  let minutesDifference = Math.floor(difference / 1000 / 60);
  difference -= minutesDifference * 1000 * 60

  let secondsDifference = Math.floor(difference / 1000);
  const difference_s = `${daysDifference + ' day/s '} ${hoursDifference + ' hour/s '} ${minutesDifference + ' minute/s '} ${secondsDifference + ' second/s '} ${difference_init + ' ms '}`
  console.log("index: ",index,"==TEST1== +-:-> seconds difference : ", difference_s)
}

export const checkDataSize = data => {
  console.log("==TEST2== +-:-> message byte size : ", Buffer.byteLength(data, 'utf8'), 'byte')
}
export const checkdifference = (sent_date, index) => {
  timeDifference(new Date(Date.now()), sent_date, index)
}

export { crypto, timeDifference, fsmanager }
export default { crypto, timeDifference, checkdifference, fsmanager, checkDataSize }
