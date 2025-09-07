const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
const displayExpression = document.querySelector(".expression");
const displayCurrent = document.querySelector(".current");
const buttons = document.querySelectorAll(".buttons button");

let currentInput = "0";
let operator = null;
let firstOperand = null;
let shouldResetDisplay = false;
let expression = "";

// Theme Toggle
themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  themeToggle.textContent = body.classList.contains("dark") ? "☀️" : "🌙";
});

// Calculator Functionality
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.value;

    if (!isNaN(value) || value === ".") {
      handleNumber(value);
    } else {
      handleOperator(value);
    }
    updateDisplay();
  });
});

function handleNumber(num) {
  if (currentInput === "0" || shouldResetDisplay) {
    currentInput = num;
    shouldResetDisplay = false;
  } else {
    currentInput += num;
  }
}

function handleOperator(op) {
  switch (op) {
    case "clear":
      currentInput = "0";
      firstOperand = null;
      operator = null;
      expression = "";
      break;
    case "backspace":
      currentInput = currentInput.slice(0, -1) || "0";
      break;
    case "+/-":
      currentInput = (parseFloat(currentInput) * -1).toString();
      break;
    case "=":
      if (operator && firstOperand !== null) {
        expression += ` ${currentInput}`;
        currentInput = operate(firstOperand, parseFloat(currentInput), operator).toString();
        operator = null;
        firstOperand = null;
        shouldResetDisplay = true;
      }
      break;
    default: // +, -, *, /, %
      if (operator && !shouldResetDisplay) {
        currentInput = operate(firstOperand, parseFloat(currentInput), operator).toString();
      }
      operator = op;
      firstOperand = parseFloat(currentInput);
      expression = `${firstOperand} ${operator}`;
      shouldResetDisplay = true;
      break;
  }
}

function operate(a, b, op) {
  switch (op) {
    case "+": return a + b;
    case "-": return a - b;
    case "*": return a * b;
    case "/": return b !== 0 ? a / b : "Error";
    case "%": return a % b;
    default: return b;
  }
}

function updateDisplay() {
  displayCurrent.textContent = currentInput;
  displayExpression.textContent = expression;
}
