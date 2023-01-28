const timerButtons = document.querySelectorAll('.timer__button');
const displayTimeLeft = document.querySelector('.display__time-left');
const displayEndTime = document.querySelector('.display__end-time');
const customForm = document.querySelector('#custom');
let intervalId;

function timer(seconds) {
    clearInterval(intervalId);

    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft.textContent = new Date(then - Date.now()).toISOString().substr(14, 5);
    displayEndTime.textContent = new Date(then).toLocaleString();

    intervalId = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if (secondsLeft < 0) {
            clearInterval(intervalId);
            return;
        }
        displayTimeLeft.textContent = new Date(secondsLeft * 1000).toISOString().substr(14, 5);
    }, 1000);
}

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

timerButtons.forEach(button => button.addEventListener('click', startTimer));

customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
});

