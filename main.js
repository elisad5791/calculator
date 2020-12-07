let add = (x, y) => x + y;
let substract = (x, y) => x - y;
let multiply = (x, y) => x * y;
let divide = (x, y) => x / y;
let operate = (operator, x, y) => { 
    let result = operator(x,y);
    if (result.toString().length > 11) {
        result = result.toPrecision(10);
    } 
    return result;
}
const lookup = {
    '+': add,
    '-': substract,
    '*': multiply,
    '/': divide
};
let currentNum = '';
let firstNum;
let operation;
const display = document.querySelector('#screen');

const digits = document.querySelectorAll('.digit');
digits.forEach(digit => digit.addEventListener('click', digitClick));

function digitClick(e) {
    const num = e.target.textContent;
    currentNum += num;
    if (firstNum === undefined) {
        display.textContent = currentNum;
    } else {
        display.textContent = `${firstNum} ${operation} ${currentNum}`;
    }
}

const opers = document.querySelectorAll('.math');
opers.forEach(oper => oper.addEventListener('click', mathClick));

function mathClick(e) {
    const oper = e.target.textContent;
    if (firstNum === undefined) {
        firstNum = currentNum;
    } else {
        firstNum = operate(lookup[operation], Number(firstNum), Number(currentNum));
    }
    currentNum = '';
    operation = oper;
    display.textContent = `${firstNum} ${oper} `;
}

const equal = document.querySelector('.equally');
equal.addEventListener('click', equalClick);

function equalClick(e) {
    if (firstNum === undefined) return; 
    currentNum = operate(lookup[operation], Number(firstNum), Number(currentNum));
    firstNum = undefined;
    display.textContent = `${currentNum}`;
}

const clr = document.querySelector('.clear');
clr.addEventListener('click', clearClick);

function clearClick(e) {
    currentNum = '';
    firstNum = undefined;
    operation = undefined;
    display.textContent = '';
}

const del = document.querySelector('.delete');
del.addEventListener('click', deleteClick);

function deleteClick(e) {
    currentNum = currentNum.substr(0, currentNum.length - 1);
    let str = '';
    if (firstNum !== undefined) {
        str = str.concat(firstNum, ' ', operation, ' '); 
    }
    str = str.concat(currentNum);
    display.textContent = str;
}

const dot = document.querySelector('.dot');
dot.addEventListener('click', dotClick);

function dotClick(e) {
    currentNum += '.';
    if (firstNum === undefined) {
        display.textContent = currentNum;
    } else {
        display.textContent = `${firstNum} ${operation} ${currentNum}`;
    }
}