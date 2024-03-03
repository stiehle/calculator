const keysEl = document.getElementsByClassName("keys")[0];
const displayCalcEl = document.getElementsByClassName("display-calc")[0];
const displayNumberEl = document.getElementsByClassName("display-number")[0];
const displayOutputEl = document.getElementsByClassName("output-wrapper")[0];

let sum = 0;
let lastOperand = "";
let currentOperand = "";
let lastNumber = "";
let currentNumber = sum;
let firstNumber = false;
let statusComma = false;

setDisplayCalc("");
setDisplayNumber(sum);

const operators = ["+", "-", "*", "/"];
const commands = ["=", "CE", "C"];

const keysLabel = [
  "7",
  "8",
  "9",
  "/",
  "4",
  "5",
  "6",
  "*",
  "1",
  "2",
  "3",
  "-",
  "0",
  ".",
  "=",
  "+",
  "x",
  "CE",
  "x",
  "x",
];

makeKeys();

function makeKeys() {
  let buttonAddClass = "";

  for (let i = 0; i < keysLabel.length; i++) {
    buttonClick = '"' + keysLabel[i] + '"';
    buttonLabel = keysLabel[i];

    if (operators.includes(keysLabel[i])) {
      buttonAddClass = " button-1";
    }
    if (commands.includes(keysLabel[i])) {
      buttonAddClass = " button-2";
    }

    if (keysLabel[i] !== "x") {
      keysEl.innerHTML +=
        "<button class='button" +
        buttonAddClass +
        "' onclick='checkKey(" +
        buttonClick +
        ")'>" +
        buttonLabel +
        "</button>";
    } else {
      keysEl.innerHTML += "<p></p>";
    }

    buttonAddClass = "";
  }
}

function checkKey(number) {
  if (operators.includes(number)) {
    calcSum(number);
  } else if (commands.includes(number)) {
    doCommands(number);
  } else {
    addDisplayNumber(number);
  }
}

function addDisplayNumber(number) {
  if (firstNumber) {
    if (number != ".") {
      displayNumberEl.innerHTML += number;
    } else if (statusComma === false) {
      displayNumberEl.innerHTML += number;
      statusComma = true;
    }
  } else {
    if (number === "." && statusComma === false) {
      displayNumberEl.innerHTML = "0" + number;
      setNumberAndComma(true, true);
    } else {
      displayNumberEl.innerHTML = number;

      if (number != "0") {
        firstNumber = true;
      }
    }
  }
}

function setDisplayCalc(number) {
  displayCalcEl.innerHTML = number;
}

function setDisplayNumber(number) {
  displayNumberEl.innerHTML = number;
}

function doCommands(com) {
  if (com === "=") {
    calculateEnd(com);
  }
  if (com === "CE") {
    resetCalulator(0);
    resetOutput();
  }
}

function calcSum(operand) {
  currentNumber = displayNumberEl.innerHTML;

  if (lastOperand === "") {
    lastOperand = operand;
    lastNumber = currentNumber;
    setDisplayCalc(lastNumber + " " + lastOperand);
    setNumberAndComma(false, false);
  } else {
    sum = calculate(lastNumber, currentNumber, lastOperand);
    showCalculation(lastNumber, currentNumber, lastOperand, "=", sum);
    setDisplayNumber(sum);
    setDisplayCalc(sum + " " + operand);
    setNumberAndComma(false, false);
    lastOperand = operand;
    lastNumber = sum;
  }
}

function setNumberAndComma(setFirstNumber, setStatusComma) {
  firstNumber = setFirstNumber;
  statusComma = setStatusComma;
}

function calculateEnd(operand) {
  currentNumber = displayNumberEl.innerHTML;

  if (lastNumber === "") {
    sum = currentNumber;
    setDisplayNumber(sum);
    showCalculation(lastNumber, currentNumber, lastOperand, operand, sum);
  } else {
    sum = calculate(lastNumber, currentNumber, lastOperand);
    showCalculation(lastNumber, currentNumber, lastOperand, operand, sum);
    resetCalulator(sum);
  }
}

function calculate(last, current, operand) {
  let calcSum;
  if (operand === "+") {
    calcSum = Number(last) + Number(current);
  } else if (operand === "-") {
    calcSum = Number(last) - Number(current);
  } else if (operand === "*") {
    calcSum = Number(last) * Number(current);
  } else if (operand === "/") {
    calcSum = Number(last) / Number(current);
  }

  calcSum = Math.round(calcSum * 100000000) / 100000000;
  return calcSum;
}

function showCalculation(last, current, lastOperand, operand, sum) {
  out = last + " " + lastOperand + " " + current + " " + operand + " " + sum;

  const lastOutput = displayOutputEl.innerHTML;
  displayOutputEl.innerHTML = "<h3>" + out + "</h3>" + lastOutput;
}

function resetCalulator(sum) {
  lastOperand = "";
  currentOperand = "";
  lastNumber = "";
  currentNumber = sum;

  setDisplayCalc("");
  setDisplayNumber(sum);
  setNumberAndComma(false, false);
}
function resetOutput() {
  displayOutputEl.innerHTML = "";
}
