const boxes = document.querySelectorAll(".box");
const container = document.querySelector(".container");
const reset = document.querySelector("#reset");
const winner = document.querySelector("#winner");
const start = document.querySelector("#start");

start.addEventListener("click", () => {
    console.log("start");
    startTimer();
    container.style.display = "flex";
    reset.style.display = "flex";
    start.style.display = "none";
});

turnX = true;

const winPattern = [ask
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

let chackWinner = () =>{
    let isDraw = true;

    for (let box of boxes) {
        if (box.innerText === "") {
            isDraw = false;
        }
    }

    if (isDraw) {
        winner.innerText = "Its, draw";
        winner.style.color = "red"; 
        console.log("draw");
        clearInterval(timecount);
    }

    for (let pattern of winPattern) {
        let value1 = boxes[pattern[0]].innerText;
        let value2 = boxes[pattern[1]].innerText;
        let value3 = boxes[pattern[2]].innerText;

        if (value1 != "" && value2 != "" && value3 != "") {
            if (value1 === value2 && value2 === value3) {
                console.log("winner", value1);
                winner.innerText = `congratulations, winner is ${value1}`;
                winner.style.color = "yellow";
                disablebox();
                clearInterval(timecount);
            }
        }
    }
}

const disablebox = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enablebox = () => {
    for (let box of boxes) {
        box.disabled = false;
    }
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("clicked");

        if (turnX) {
            box.innerText = "X";
            box.style.color = "yellow";
            box.disabled = true;
            turnX = false;
        } else {
            box.innerText = "O";
            box.style.color = "red";
            turnX = true;
        }
        box.disabled = true;
        chackWinner();
    });

    reset.addEventListener("click", () => {
        console.log("Reset");
        box.innerText = "";
        box.disabled = false;
        enablebox();
        winner.innerText = "";
        startTimer();
    });
});

let timecount;

const startTimer = () => {
    let time = 60;
    document.getElementById("timer").innerText = `Time Left : ${time}s`;
    clearInterval(timecount);
    timecount = setInterval(() => {
        time--;
        document.getElementById("timer").innerText = `Time Left : ${time}s`;
        if (time <= 0) {
            clearInterval(timecount);
            console.log("Times up");
            winner.innerText = `Time Up Its, Draw!`;
            winner.style.color = "red";
            disablebox();
        }
    }, 1000);
}