let currentNum
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
document.addEventListener('keydown', (e) => { // keyboard controls
    for (button of buttons) {
        if (e.key === button.innerHTML){
            button.classList.add('active');
        }
        if(e.key === 'Escape' && button.innerHTML === 'AC'){
            button.classList.add('active');
           }
    }
})
document.addEventListener('keyup', (e) => { 
    for (button of buttons){
       if(e.key === button.innerHTML){
        button.click();
        button.classList.remove('active');
       } 
       if(e.key === 'Escape' && button.innerHTML === 'AC'){
        button.click()
        button.classList.remove('active');
       }
    if (currentNum !== 0 && e.key === 'Backspace' && !isNaN(lastInp)){
        shortenNum(-1);
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
        if (currentNum.toString().indexOf('.') !== -1) return;
        currentNum += inp;
        adjustFontSize();
        update()
        lastInp = inp;
        return;
    }
    if (inp === '0' && currentNum === 0) return;
    if (inp === '%') {
        currentNum = currentNum / 100;
        update();
        return;
    }
    if (inp === '+/-'){
        currentNum = -currentNum;
        update();
        return;
    }

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
function update(time = 30){
    display.textContent = '';
    adjustFontSize();
    setTimeout(() => display.textContent = currentNum, time);
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
            typeAnimation('Nice Try!');
            return;
        }
        currentNum = compute(expression);
        adjustFontSize();
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
function shortenNum (idx) {
    currentNum = currentNum.toString().split('').slice(0,idx).join('');
}
function adjustFontSize() {
    let len = currentNum.toString().length;
    switch(true){
        case (len === 1): 
            display.style.fontSize = '34px';
            break;
        case (len >= 12):
            display.style.fontSize = '14px';
            break;
        case (len >= 8):
            display.style.fontSize = '24px';
            break;     
    }
}
function typeAnimation(string) {
    currentNum = '';
    for (let i = 0; i < string.length; i++){
        setTimeout (() => {
            currentNum += string[i];
            update()
        }, i*300)
    }
    let arr;
    setTimeout(()=>{
    for (let j = 0; j <= string.length; j++){
        setTimeout (() => {
            if (j === string.length){
                clear();
                return;
            }
            arr = currentNum.split('');
            arr[j] = ' ';
            currentNum = arr.join('');
            update(0)
        }, j*100)
    }
}, (string.length * 300 + 1000))
}

typeAnimation('Welcome!')
