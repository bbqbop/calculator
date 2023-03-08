let currentNum = 0;
let lastInp;
let abSwitch = true;
let lastOperator;
const expression = {
    operator: null,
    numA: null,
    numB: null,
}
const display = document.querySelector('#display')
const buttons = document.querySelectorAll('button');
buttons.forEach(button => { // mouse controls
    button.addEventListener('click', (event) => {
        assignInput(event.target.innerText);
    })
})
document.addEventListener('keyup', (e) => { // keyboard controls
    for (button of buttons){
       if(e.key === button.innerHTML){
        button.click()
       } 
       if(e.key === 'Escape' && button.innerHTML === 'AC'){
        button.click()
       }
    if (currentNum !== 0 && e.key === 'Backspace' && !isNaN(lastInp)){
        // remove last digit
        currentNum = currentNum.toString().split('').slice(0,-1).join('');
        update();
        // never leave screen empty
        if (currentNum.toString().length === 0){
            currentNum = 0;
            update();
        }
        return;
    }
    }
})

function assignInput(inp){
    if (inp === 'AC'){
        clear();
        return;
    }
    if (inp === ".") {
        if (isNaN(lastInp)) return;
        currentNum += inp;
        update()
        lastInp = inp;
        return;
    }
    if (inp === '0' && currentNum === 0) return;
    
    if (!isNaN(inp)){ 
        process.isNumber(inp);
        return;
    }
    if (abSwitch || lastInp === '=' && isOperator(inp)){  
        process.isFirstOperator(inp);
        return;
    } else process.isSecondOperator(inp)
}
function compute(ex){
    lastOperator = ex.operator;
    return operators[ex.operator](ex.numA, ex.numB)
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
    update();
    abSwitch = true;
}
function isOperator(inp){
    return isNaN(inp) && inp !== '=' && inp !== '.';
}
function update(){
    display.textContent = currentNum;
}
const process = {
    isNumber : function(inp){
        if (isOperator(lastInp)) currentNum = 0;
        if (currentNum === 0 || currentNum === expression.numA 
            ? currentNum = inp : currentNum += inp)
        update()
        lastInp = inp;},
    isFirstOperator : function(inp){
        if (inp === '=') return;
        else {
            inp = translateOp(inp);
            expression.operator = inp;
            expression.numA = Number(currentNum);
            abSwitch = false;
            lastInp = inp;
        }},
    isSecondOperator : function(inp){
        inp = translateOp(inp); 
        if (isOperator(lastInp) && isOperator(inp) || 
            isOperator(lastInp) && inp === '=') {
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
        currentNum = compute(expression);
        update();
        expression.operator = inp;
        expression.numA = currentNum;
        lastInp = inp;
    }
}
const operators = {
    add: function(a, b){return a + b},
    subtract: function(a, b) {return a - b},
    multiply: function(a, b) {return a * b},
    divide: function(a, b) {return a / b},
}
