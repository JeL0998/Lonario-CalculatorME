// Select all buttons and display elements
const buttons = document.querySelectorAll('.buttons button');
const equationDisplay = document.querySelector('.equation');
const resultDisplay = document.querySelector('.result');

// Initialize input and equation variables
let currentInput = '';
let currentOperator = '';
let currentEquation = '';

// Function for formatting number with commas and decimal places
function formatNumber(number) {
  return parseFloat(number).toLocaleString('en-US', {
    maximumFractionDigits: 16,
    minimumFractionDigits: 0,
  });
}

// Add click event listener to each button
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    // If button is a digit or decimal point, add it to the input
    if (value >= '0' && value <= '9' || value === '.') {
      if (currentInput.length < 16) {
        currentInput += value;
        resultDisplay.textContent = formatNumber(currentInput);
      }
    }
    // If button is "C", clear all variables and displays
    else if (value === 'C') {
      currentInput = '';
      currentOperator = '';
      currentEquation = '';
      equationDisplay.textContent = '';
      resultDisplay.textContent = '0';
    }
    // If button is "Backspace", remove last digit from input
    else if (value === 'Backspace') {
      currentInput = currentInput.slice(0, -1);
      // Check if currentInput is empty, if so, display "0"
      if (currentInput === '') {
        resultDisplay.textContent = '0';
      } else if (currentInput === '-' && currentEquation.endsWith(currentInput)) {
        resultDisplay.textContent = '0';
      } else {
        resultDisplay.textContent = formatNumber(currentInput);
      }
    }
    // If button is an operator, add it to the equation and update operator variable
    else if (value === '+' || value === '-' || value === '*' || value === '/') {
      if (currentInput) {
        currentEquation += currentInput + ' ' + value + ' ';
        currentOperator = value;
        equationDisplay.textContent = currentEquation;
        currentInput = '';
      }
    }
    // If button is "=", compute the result of the equation and display it
    if (value === '=') {
      if (currentInput && currentEquation) {
        currentEquation += currentInput;
        const result = eval(currentEquation); // Use eval() to compute equation
        if (result === Infinity) {
          resultDisplay.textContent = "Undefined";
        } else {
          resultDisplay.textContent = formatNumber(result.toFixed(2).replace(/\.00$/,''));
        }
        equationDisplay.textContent = '';
        currentEquation = '';
        currentInput = result.toFixed(2).replace(/\.00$/,'');
      }
    }
  });
});

// Arithmetic functions for addition, subtraction, multiplication, and division
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

// Function to call appropriate arithmetic function based on operator
function functionOperate(operator, a, b) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      if (b === 0) {
        return "Undefined";
      }
      return divide(a, b);
    default:
      return "Invalid operator";
  }
}