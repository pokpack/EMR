import crypto from './crypto'
import fsmanager from './fsmanager'
const timeDifference = (date1, date2) => {
  var difference = date1.getTime() - date2.getTime();

  var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
  difference -= daysDifference * 1000 * 60 * 60 * 24

  var hoursDifference = Math.floor(difference / 1000 / 60 / 60);
  difference -= hoursDifference * 1000 * 60 * 60

  var minutesDifference = Math.floor(difference / 1000 / 60);
  difference -= minutesDifference * 1000 * 60

  var secondsDifference = Math.floor(difference / 1000);
  console.log("===========secondsDifference===========")
  console.log(`sent = ${date1}`, `receive = ${date2}`)
  console.log('difference = ' +
    daysDifference + ' day/s ' +
    hoursDifference + ' hour/s ' +
    minutesDifference + ' minute/s ' +
    secondsDifference + ' second/s ' +
    difference + 's');
  console.log("=======================================")
}

const checkdifference = (sent_date) => {
  timeDifference(new Date(Date.now()), sent_date)
}

export { crypto, timeDifference, checkdifference, fsmanager }
export default { crypto, timeDifference, checkdifference, fsmanager }
