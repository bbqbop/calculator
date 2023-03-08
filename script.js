const display = document.querySelector('#display')
const button = document.querySelectorAll('button');
let currentNum = 0;
let lastInp;
let abSwitch = true;
let lastOperator;
const expression = {
    operator: null,
    numA: null,
    numB: null,
}
const operators = {
    add: function(a, b){return a + b},
    subtract: function(a, b) {return a - b},
    multiply: function(a, b) {return a * b},
    divide: function(a, b) {return a / b},
}

button.forEach(button => {
    button.addEventListener('click', (event) => {
        writeDisplay(event.target.innerText);
    })
})

function writeDisplay(inp){
    if (inp === 'AC'){
        clear();
        return;
    }
    if (inp === '0' && currentNum === 0) return;
    
    if (!isNaN(inp)){
        currentNum = 0;
        if (currentNum === 0 || currentNum === expression.numA ? currentNum = inp : currentNum += inp)
        display.textContent = currentNum;
        lastInp = inp;
        return;
    }
    // input is an operator after 1st number
    if (abSwitch){  
        if (inp === '=') return;
        else {
            inp = translateOp(inp);
            expression.operator = inp;
            expression.numA = Number(currentNum);
            abSwitch = false;
            lastInp = inp;
            return;
        }
    }
    // input is an operator after 2nd number
    else { 
        inp = translateOp(inp); 
        if (isOperator(lastInp) && isOperator(inp) || isOperator(lastInp) && inp === '=') {
            return;
            } 
        if (lastInp === '=' && inp === '='){
            expression.operator = lastOperator;    
        } else { 
            expression.numB = Number(currentNum);
        }
        if (expression.operator === 'divide' && expression.numB === 0){
            display.textContent = 'Nice Try!';
            return;
        }
        currentNum = operate(expression);
        display.textContent = currentNum;
        expression.operator = inp;
        expression.numA = currentNum;
        lastInp = inp;
    }
}

function translateOp (op){
    switch(op){
        case ('+'): return 'add';
            break;
        case ('-'): return'subtract';
            break;
        case ('*'): return 'multiply';
            break;
        case ('/'): return 'divide';
            break;
        case ('='): return op;
    }
}

function clear(){
    expression.operator = null;
    expression.numA = null;
    expression.numB = null;
    currentNum = 0;
    display.textContent = currentNum;
    abSwitch = true;
}

function operate(ex){
    lastOperator = ex.operator;
    return operators[ex.operator](ex.numA, ex.numB)
}

function isOperator(inp){
    return isNaN(inp) && inp !== '=';
}