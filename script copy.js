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
const expression = {
    op: null,
    numA: 0,
    numB: null,
}
let aB = true;

const operators = {
    add: function(a, b){return a + b},
    subtract: function(a,b) {return a - b},
    multiply: function(a,b) {return a * b},
    divide: function(a,b) {return a / b},
}
function operate(op, a, b){
    return operators[op](Number(a), Number(b));
}
button.forEach(button => {
    button.addEventListener('click', (event) => {
        writeDisplay(event.target.innerText);
    })
})
function translateOp (op){
    switch(op){
        case ('+'): op = 'add';
            break;
        case ('-'): op = 'subtract';
            break;
        case ('*'): op = 'multiply';
            break;
        case ('/'): op = 'divide';
            break;
        case ('='): op = null;
            break;
        case ('AC'): 
            expression.op = null;
            expression.numA = null;
            expression.numB = null;
            break;
    }
}

function writeDisplay(inp){
    if (inp === '0' && currentNum === 0) return;
    if (!isNaN(inp)){
        if (currentNum === 0 ? currentNum = inp : currentNum += inp)
        display.textContent = currentNum;
    }
    else {
        if (aB){
            inp = translateOp(inp)
            expression.op = inp;
            expression.numA = currentNum;
            currentNum = 0;
            aB = false;
        } else {
            expression.numB = currentNum;
            inp = translateOp(inp);
            currentNum = operate(expression.op,expression.numA,expression.numB)
            display.textContent = currentNum;
            expression.op = inp;
            aB = true;
        }
    }
}
function initiate(){
    writeDisplay(0)
}

writeDisplay(currentNum);


