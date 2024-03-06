const keysEl = document.getElementsByClassName("keys")[0];
const displayCalcEl = document.getElementsByClassName("display-calc")[0];
const displayNumberEl = document.getElementsByClassName("display-number")[0];
const displayOutputEl = document.getElementsByClassName("output-wrapper")[0];

const menuEL = document.getElementsByClassName("menu")[0];

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
  "CE",
];

makeKeys();

function makeKeys() {
  let buttonAddClass = "";

  for (let i = 0; i < keysLabel.length; i++) {
    if (operators.includes(keysLabel[i])) {
      buttonAddClass = " button-1";
    }
    if (commands.includes(keysLabel[i])) {
      buttonAddClass = " button-2";
    }
    keysEl.innerHTML += `<button class="button${buttonAddClass}" onclick=checkKey("${keysLabel[i]}")>${keysLabel[i]}</button> `;
    buttonAddClass = "";
  }
}

function checkKey(number) {
  if (operators.includes(number)) {
    calcSum(number);
  } else if (commands.includes(number)) {
    doCommands(number);
  } else {
    if (number === ".") {
      addDisplayComma(number);
    } else {
      addDisplayNumber(number);
    }
  }
}

// function addDisplayNumber(number) {
//   switch (firstNumber) {
//     case true:
//       displayNumberEl.innerHTML += number;
//       break;

//     case false:
//       displayNumberEl.innerHTML = number;

//       if (number !== "0") {
//         firstNumber = true;
//       }
//       break;
//   }
// }

function addDisplayNumber(number) {
  if (firstNumber) {
    displayNumberEl.innerHTML += number;
  } else {
    displayNumberEl.innerHTML = number;

    if (number !== "0") {
      firstNumber = true;
    }
  }
}

// function addDisplayComma(number) {
//   switch (statusComma) {
//     case false:
//       if (firstNumber) {
//         displayNumberEl.innerHTML += number;
//         statusComma = true;
//       } else {
//         displayNumberEl.innerHTML = "0" + number;
//         setFirstNumberAndComma(true, true);
//       }
//       break;
//   }
// }

function addDisplayComma(number) {
  if (!statusComma) {
    if (firstNumber) {
      displayNumberEl.innerHTML += number;
      statusComma = true;
    } else {
      displayNumberEl.innerHTML = "0" + number;
      setFirstNumberAndComma(true, true);
    }
  }
}

function setDisplayCalc(number) {
  displayCalcEl.innerHTML = number;
}

function setDisplayNumber(number) {
  // displayNumberEl.innerHTML = number;
  displayNumberEl.innerHTML = roundCalculateSum(number);
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

  if (!lastOperand) {
    lastOperand = operand;
    lastNumber = currentNumber;
    setDisplayCalc(lastNumber + " " + lastOperand);
    setFirstNumberAndComma(false, false);
  } else {
    sum = calculate(lastNumber, currentNumber, lastOperand);
    showCalculation(lastNumber, currentNumber, lastOperand, "=", sum);
    setDisplayNumber(sum);
    setDisplayCalc(sum + " " + operand);
    setFirstNumberAndComma(false, false);
    lastOperand = operand;
    lastNumber = sum;
  }
}

function setFirstNumberAndComma(setFirstNumber, setStatusComma) {
  firstNumber = setFirstNumber;
  statusComma = setStatusComma;
}

function calculateEnd(operand) {
  currentNumber = displayNumberEl.innerHTML;

  if (!lastNumber) {
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

  return calcSum;
}

function roundCalculateSum(sum) {
  return Math.round(sum * 100000000) / 100000000;
}

function showCalculation(last, current, lastOperand, operand, sum) {
  // out = last + " " + lastOperand + " " + current + " " + operand + " " + sum;
  out = `${last} ${lastOperand} ${current} ${operand} ${roundCalculateSum(
    sum
  )}`;

  const lastOutput = displayOutputEl.innerHTML;
  // displayOutputEl.innerHTML = "<h3>" + out + "</h3>" + lastOutput;
  displayOutputEl.innerHTML = `<h3> ${out} </h3> ${lastOutput}`;
}

function resetCalulator(sum) {
  lastOperand = "";
  currentOperand = "";
  lastNumber = "";
  currentNumber = sum;

  setDisplayCalc("");
  setDisplayNumber(sum);
  setFirstNumberAndComma(false, false);
}

function resetOutput() {
  displayOutputEl.innerHTML = "";
}

function showMenu() {
  console.log("Hallo Menu");
  menuEL.classList.toggle("menu-active");
}
