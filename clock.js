export function updateTime() {
    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const time = date.toLocaleTimeString();
    const day = date.toLocaleDateString(undefined, options);
    const el = document.getElementById('time');
    if (el) el.innerHTML = `${day}, ${time}`;
}

function startClock(interval = 1000) {
    updateTime();
    return setInterval(updateTime, interval);
}

export default startClock;