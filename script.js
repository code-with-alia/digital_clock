//  Get the elements from the page
const timeEl = document.getElementById('time');
const periodEl = document.getElementById('period');
const dateEl = document.getElementById('date');
const zoneEl = document.getElementById('zone');
const themeBtn = document.getElementById('toggleTheme');
const formatBtn = document.getElementById('toggleFormat');

//Settings that change when buttons are clicked
let use24h = false;
let theme = 'dark';

// add zero if num > 10
function addZero(number) {
    return number < 10 ? '0' + number : number;
}

// Update the time and date on the page
function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    let period = '';

    if (use24h === false) {
        period = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        if (hours === 0) {
            hours = 12;
        }
    }

    timeEl.textContent = addZero(hours) + ':' + addZero(minutes) + ':' + addZero(seconds);
    periodEl.textContent = period;

   // for date format
    dateEl.textContent = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

zoneEl.textContent = Intl.DateTimeFormat().resolvedOptions().timeZone;

// Run once now, then every 1 
updateClock();
setInterval(updateClock, 1000);

// Theme button: switch between dark and light
themeBtn.addEventListener('click', function () {
    if (theme === 'dark') {
        theme = 'light';
        themeBtn.textContent = 'Switch to dark mode';
    } else {
        theme = 'dark';
        themeBtn.textContent = 'Switch to light mode';
    }
    document.documentElement.setAttribute('data-theme', theme);
});

// Format button: switch between 12-hour and 24-hour
formatBtn.addEventListener('click', function () {
    use24h = !use24h; 

    if (use24h) {
        formatBtn.textContent = 'Use 12-hour format';
    } else {
        formatBtn.textContent = 'Use 24-hour format';
    }

    updateClock();
});