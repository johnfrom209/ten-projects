const daysEl =  document.getElementById('day')
const hoursEl = document.getElementById('hour')
const minsEl = document.getElementById('min')
const secEl = document.getElementById('sec')

const easter = '9 April 2023';

function countdown(){
    const easterDate = new Date(easter);
    const currentDate = new Date();

    const totalSeconds = (easterDate - currentDate) / 1000;
    const days = Math.floor(totalSeconds / 3600 /  24);
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const mins = (Math.floor(totalSeconds / 60)) % 60;
    const secs = Math.floor(totalSeconds) % 60;

    console.log(days, hours, mins, secs);

    daysEl.innerHTML = days;
    hoursEl.innerHTML = formatTime(hours);
    minsEl.innerHTML = formatTime(mins);
    secEl.innerHTML = formatTime(secs);

}

function formatTime(time){
    return time < 10 ? (`0${time}`) : time;
}

countdown();

setInterval(countdown, 1000);