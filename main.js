

let doReset = false;
let leftEx = '';
let rightEx = '';
let curOperation = null;
let displayValue = "";


const numButtons = document.querySelectorAll('[num]');
const oprButtons = document.querySelectorAll('[opr]');
const equalButton = document.getElementById('equalButton');
const clearButton = document.getElementById('clearButton');
const pointButton = document.getElementById('pointButton');
const delButton = document.getElementById('delButton');
const curScreen = document.getElementById('currentScreen');
const lastScreen = document.getElementById('lastScreen');



window.addEventListener('keydown', handleKeyboardInput)
equalButton.addEventListener('click', evaluate);
clearButton.addEventListener('click', clear);
delButton.addEventListener('click', deleteNum);
pointButton.addEventListener('click', appendPoint);

numButtons.forEach((button) => {
    button.addEventListener('click', () => appendNum(button.textContent))
});

oprButtons.forEach((button) => {
    button.addEventListener('click', () => appendOpr(button.textContent))
});

function appendNum(txt) {
    if (curScreen.textContent === '0' || doReset) {
        resetCurScreen();
    }
    curScreen.textContent += txt;
}

function resetCurScreen() {
    curScreen.textContent = "";
    doReset = false;
}

function clear() {
    curScreen.textContent = "0";
    lastScreen.textContent = "";
    leftEx = 0;
    rightEx = 0;
    curOperation = null;
}

function appendPoint() {
    if (doReset) resetCurScreen();
    if (curScreen.textContent === '') {
        curScreen.textContent = '0';
    }
    if (curScreen.textContent.includes('.')) return;
    curScreen.textContent += '.';
}

function deleteNum() {
    curScreen.textContent = curScreen.textContent.toString().slice(0, -1);
}

function appendOpr(operator) {
    if (curOperation !== null) evaluate();
    leftEx = curScreen.textContent;
    curOperation = operator;
    lastScreen.textContent = `${leftEx} ${curOperation}`;
    doReset = true;
}

function evaluate() {
    if (curOperation === null || doReset) return;
    if (curOperation === '÷' && curScreen.textContent === '0') {
        alert('can divide by 0');
        return;
    }
    rightEx = curScreen.textContent;
    curScreen.textContent = roundResult(operate(leftEx, rightEx, curOperation));
    lastScreen.textContent = `${leftEx} ${curOperation} ${rightEx} = `;
    curOperation = null;

}

function roundResult(number) {
    return Math.round(number * 1000) / 1000
}

function handleKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) appendNum(e.key);
    if (e.key === '.') appendPoint();
    if (e.key === '=' || e.key === 'Enter') evaluate();
    if (e.key === 'Backspace') deleteNum();
    if (e.key === 'c') clear();
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
        appendOpr(convertOperator(e.key))
    return;
}

function convertOperator(msg) {
    if (msg === '/') return '÷';
    if (msg === '*') return '×';
    if (msg === '-') return '−';
    if (msg === '+') return '+';
}

function add(x, y) {
    return x + y;
}

function sub(x, y) {
    return x - y;
}

function mul(x, y) {
    return x * y;
}

function div(x, y) {
   return x / y;
}

function operate(a, b, c) {
    a = Number(a);
    b = Number(b);
    if (c === "÷") {
        if (b == 0) return null;
        return div(a, b);
    }
    else if (c === "×") return mul(a, b);
    else if (c === "+") return add(a, b);
    else if (c === "-") return sub(a, b);
    else return null;
}



