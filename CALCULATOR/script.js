let display = document.getElementById("display");

function appandDisplay(input) {
    display.value += input;
}

function calculate() {
    try {
        display.value = eval(display.value);
    } catch (err) {
        display.value = "ERROR";
    }
}

function clearDisplay() {
    display.value = "";
}

document.addEventListener("keydown", function (event) {
    const key = event.key;

    if (!isNaN(key)) {
        appandDisplay(key);
    } else if (["+", "-", "*", "/"].includes(key)) {
        appandDisplay(key);
    } else if (key === "Enter" || key === "=") {
        calculate();
    } else if (key === "Backspace") {
        display.value = display.value.slice(0, -1);
    } else if (key === "c" || key === "C") {
        clearDisplay();
    } else if (key === ".") {
        appandDisplay(".");
    }
});