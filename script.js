const targetDate1 = new Date('August 4, 2025 00:00:00').getTime();
const targetDate2 = new Date('March 29, 2025 00:00:00').getTime();

function updateCountdown(targetDate, countdownId) {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
        document.getElementById(countdownId).innerHTML = "It's time!";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    const milliseconds = distance % 1000;

    const countdownValue = `${days} Days ${hours} Hours ${minutes} Minutes ${seconds}.${milliseconds.toString().padStart(3, '0')} Seconds`;

    const suffix = countdownId === 'countdown1' ? '' : '2';
    document.getElementById('days' + suffix).innerText = days;
    document.getElementById('hours' + suffix).innerText = hours;
    document.getElementById('minutes' + suffix).innerText = minutes;
    document.getElementById('seconds' + suffix).innerText = `${seconds}.${milliseconds.toString().padStart(3, '0')}`;

    document.getElementById('copyButton' + suffix).dataset.countdown = countdownValue;
}

function copyCountdown(buttonId) {
    const countdownValue = document.getElementById(buttonId).dataset.countdown;
    navigator.clipboard.writeText(countdownValue).then(() => {
        const copyButton = document.getElementById(buttonId);
        copyButton.innerText = 'Copied!';
        setTimeout(() => {
            copyButton.innerText = 'Copy Countdown';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy countdown: ', err);
    });
}

document.getElementById('copyButton').addEventListener('click', () => copyCountdown('copyButton'));
document.getElementById('copyButton2').addEventListener('click', () => copyCountdown('copyButton2'));

setInterval(() => {
    updateCountdown(targetDate1, 'countdown1');
    updateCountdown(targetDate2, 'countdown2');
}, 1);
