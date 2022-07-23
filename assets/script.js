
/* Connects the script data to the elements ID */
const daysEl =  document.getElementById('day')
const hoursEl = document.getElementById('hour')
const minsEl = document.getElementById('min')
const secEl = document.getElementById('sec')

/* The date that is being count down */
const easter = '9 April 2023';

function countdown(){
    const easterDate = new Date(easter);
    const currentDate = new Date();

    /* The math to get Sec,min,hours, and days */
    const totalSeconds = (easterDate - currentDate) / 1000;
    const days = Math.floor(totalSeconds / 3600 /  24);
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const mins = (Math.floor(totalSeconds / 60)) % 60;
    const secs = Math.floor(totalSeconds) % 60;

    daysEl.innerHTML = days;
    hoursEl.innerHTML = formatTime(hours);
    minsEl.innerHTML = formatTime(mins);
    secEl.innerHTML = formatTime(secs);

}

/* Adds a 0 if number is less than 10 */
function formatTime(time){
    return time < 10 ? (`0${time}`) : time;
}

/* calls countdown function */
countdown();