const minNumber = 1;
const maxNumber = 100;
const answer = Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber);

console.log(answer);

let user = 0;
let guess;
let run = true;

while (run) {
    guess = window.prompt("Guess Number Between 1 - 100!");
    guess = Number(guess);

    if (isNaN(guess)) {
        window.alert("Please enter a valid number!");
    } else if (guess < minNumber || guess > maxNumber) {
        window.alert("Please enter a number between 1 and 100!");
    } else {
        user++;
        if (guess < answer) {
            window.alert("TOO LOW! TRY AGAIN!");
        } else if (guess > answer) {
            window.alert("TOO HIGH! TRY AGAIN!");
        } else {
            window.alert(`YOU WON! IT TOOK YOU ${user} ATTEMPTS.`);
            run = false;
        }
    }
}
