const targetDate = new Date('August 4, 2025 00:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
        // Countdown finished
        document.getElementById('countdown').innerHTML = "It's Midnight!";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    const milliseconds = distance % 1000;

    const countdownValue = `${days} Days ${hours} Hours ${minutes} Minutes ${seconds}.${milliseconds.toString().padStart(3, '0')} Seconds`;

    document.getElementById('days').innerText = days;
    document.getElementById('hours').innerText = hours;
    document.getElementById('minutes').innerText = minutes;
    document.getElementById('seconds').innerText = `${seconds}.${milliseconds.toString().padStart(3, '0')}`;

    // Update the countdown value for copying
    document.getElementById('copyButton').dataset.countdown = countdownValue;
}

function copyCountdown() {
    const countdownValue = document.getElementById('copyButton').dataset.countdown;
    navigator.clipboard.writeText(countdownValue).then(() => {
        const copyButton = document.getElementById('copyButton');
        copyButton.innerText = 'Copied!';
        setTimeout(() => {
            copyButton.innerText = 'Copy Countdown';
        }, 2000); // Revert back after 2 seconds
    }).catch(err => {
        console.error('Failed to copy countdown: ', err);
    });
}

document.getElementById('copyButton').addEventListener('click', copyCountdown);

setInterval(updateCountdown, 1);
