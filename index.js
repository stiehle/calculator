console.log("calculator");

const keys = document.getElementById("keys");
const displayCalc = document.getElementById("display-calc");
const displayNumber = document.getElementById("display-number");
const displayOutput = document.getElementById("output-wrapper");
console.log(keys);

sum = 0;
let firstNumber = false;
let lastOperand = "";
let currentOperand = "";
let lastNumber = "";
let currentNumber = sum;

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
  "CE",
  "0",
  "=",
  "+",
];

makeKeys();

function makeKeys() {
  for (let i = 0; i < keysLabel.length; i++) {
    // console.log(i);
    buttonClick = '"' + keysLabel[i] + '"';
    buttonLabel = keysLabel[i];
    console.log(i, buttonLabel);
    if (operators.includes(keysLabel[i])) {
      keys.innerHTML +=
        "<button class='button-1' onclick='checkKey(" +
        buttonClick +
        ")'>" +
        buttonLabel +
        "</button>";
    } else if (commands.includes(keysLabel[i])) {
      keys.innerHTML +=
        "<button class='button-2' onclick='checkKey(" +
        buttonClick +
        ")'>" +
        buttonLabel +
        "</button>";
    } else {
      keys.innerHTML +=
        "<button class='button' onclick='checkKey(" +
        buttonClick +
        ")'>" +
        buttonLabel +
        "</button>";
    }
  }
}

function checkKey(nr) {
  console.log("press", nr);

  // if (operators.includes(nr)) {
  //   calcSum(nr);
  // } else if (nr === "=") {
  //   calculateEnd(nr);
  // } else if (nr === "CE") {
  //   resetCalulator(0);
  // } else {
  //   addDisplayNumber(nr);
  // }

  if (operators.includes(nr)) {
    console.log("--> operator");
    calcSum(nr);
  } else if (commands.includes(nr)) {
    console.log("--> command");
    doCommands(nr);
    // if (nr === "=") calculateEnd(nr);
    // if (nr === "CE") resetCalulator(0);
  } else {
    console.log("--> number");
    addDisplayNumber(nr);
  }
}

// if (nr === "=") {
//   console.log("Key " + nr + " pressed");
//   calculateEnd(nr);
// } else if (nr === "CE") {
//   console.log("Key " + nr + " pressed");
//   resetCalulator(0);
// } else if (nr === "+") {
//   console.log("Key " + nr + " pressed");
//   calcSum(nr);
// } else if (nr === "-") {
//   console.log("Key " + nr + " pressed");
//   calcSum(nr);
// } else if (nr === "*") {
//   console.log("Key " + nr + " pressed");
//   calcSum(nr);
// } else if (nr === "/") {
//   console.log("Key " + nr + " pressed");
//   calcSum(nr);
// } else {
//   console.log("Key " + nr + " pressed");
//   addDisplayNumber(nr);
// }

function addDisplayNumber(nr) {
  if (firstNumber) {
    displayNumber.innerHTML += nr;
  } else {
    displayNumber.innerHTML = nr;
    console.log("-firstNumber-", firstNumber);
    if (nr != "0") {
      firstNumber = true;
    }
    console.log("-firstNumber-", firstNumber);
  }
}

function setDisplayCalc(nr) {
  displayCalc.innerHTML = nr;
}

function setDisplayNumber(nr) {
  displayNumber.innerHTML = nr;
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
  console.log(operand);
  currentNumber = displayNumber.innerHTML;

  if (lastOperand === "") {
    lastOperand = operand;
    lastNumber = currentNumber;
    setDisplayCalc(lastNumber + " " + lastOperand);
    firstNumber = false;
  } else {
    sum = calculate(lastNumber, currentNumber, lastOperand);
    showCalculation(lastNumber, currentNumber, lastOperand, "=", sum);
    console.log(sum);

    setDisplayNumber(sum);
    setDisplayCalc(sum + " " + operand);
    lastOperand = operand;
    firstNumber = false;
    lastNumber = sum;
  }
}

function calculateEnd(operand) {
  currentNumber = displayNumber.innerHTML;
  console.log("-End->!", lastNumber, currentNumber, lastOperand, operand);
  if (lastNumber === "") {
    sum = currentNumber;
    setDisplayNumber(sum);
    console.log("sum->", sum);
    showCalculation(lastNumber, currentNumber, lastOperand, operand, sum);
  } else {
    sum = calculate(lastNumber, currentNumber, lastOperand);
    console.log("sum---->", sum);
    showCalculation(lastNumber, currentNumber, lastOperand, operand, sum);

    resetCalulator(sum);

    // lastNumber = "";
    // lastOperand = "";
    // firstNumber = false;
    // setDisplayCalc("");
    // setDisplayNumber(sum);
  }
}

function calculate(last, current, op) {
  let calcSum;
  if (op === "+") {
    calcSum = Number(last) + Number(current);
  } else if (op === "-") {
    calcSum = Number(last) - Number(current);
  } else if (op === "*") {
    calcSum = Number(last) * Number(current);
  } else if (op === "/") {
    calcSum = Number(last) / Number(current);
  }
  console.log("fixedNum -->", calcSum.toFixed(4));

  return calcSum;
}

function showCalculation(last, current, lastOperand, operand, sum) {
  out = last + " " + lastOperand + " " + current + " " + operand + " " + sum;
  console.log(out);
  const x = displayOutput.innerHTML;
  displayOutput.innerHTML = "<h3>" + out + "</h3>" + x;
}

function resetCalulator(sum) {
  console.log("RESET !");
  // sum = 0;
  firstNumber = false;

  lastOperand = "";
  currentOperand = "";
  lastNumber = "";
  currentNumber = sum;

  setDisplayCalc("");
  setDisplayNumber(sum);
}
function resetOutput() {
  displayOutput.innerHTML = "";
}
