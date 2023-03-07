const num0 = document.querySelector('#null');
const num1 = document.querySelector('#num1');
const num2 = document.querySelector('#num2');
const num3 = document.querySelector('#num3');
const num4 = document.querySelector('#num4');
const num5 = document.querySelector('#num5');
const num6 = document.querySelector('#num6');
const num7 = document.querySelector('#num7');
const num8 = document.querySelector('#num8');
const num9 = document.querySelector('#num9');
const add = document.querySelector('#add')
const subtract = document.querySelector('#subtract');
const multiply = document.querySelector('#multiply');
const divide = document.querySelector('#divide');
const clear = document.querySelector('#clear');
const display = document.querySelector('#display')
const button = document.querySelectorAll('button');
let currentNum = 0;

const operators = {
    add: function(a, b){return a + b},
    subtract: function(a,b) {return a - b},
    multiply: function(a,b) {return a * b},
    divide: function(a,b) {return a / b},
}
function operate(op, a, b){
    return operators[op](a, b);
}
button.forEach(button => {
    button.addEventListener('click', (event) => {
        writeDisplay(event.target.innerText);
    })
})
function writeDisplay(inp){
    if (inp === '0' && currentNum === 0) return;
    if (Number(inp) || '0'){
        currentNum += inp;
        display.textContent = currentNum;
    }
}
function initiate(){
    writeDisplay(0)
}

writeDisplay(currentNum);
