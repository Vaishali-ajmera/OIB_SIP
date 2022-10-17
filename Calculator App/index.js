const currentOutput = document.querySelector(".current-output");
const previousOutput = document.querySelector(".previous-output");
const temporaryResult = document.querySelector(".temporary-result");
const operators = Array.from(document.querySelectorAll(".operator"));
const numbers = Array.from(document.querySelectorAll(".number"));
const equal = document.querySelector(".equal");

let haveDot = false;
let lastOperation = ""; 
let previous = "";
let current = "";
let result = null;
let tempResult = "";


document.addEventListener("keydown",(e)=>{
  // console.log(e.key);
  buttonAnimation(e.key);

})

function buttonAnimation(currentKey){
  // console.log(currentKey);
  let key;
   switch (currentKey) {
    case '0':
      key = "zero"
      break;

    case '1':
      key = "one"
      break;
    case '2':
      key = "two"
      break;
    case '3':
      key = "three"
      break;
    case '4':
      key = "four"
      break;
    case '5':
      key = "five"
      break;
    case '6':
      key = "six"
      break;
    case '7':
      key = "seven"
      break;
    case '8':
      key = "eight"
      break;
    case '9':
      key = "nine"
      break;
    case '+':
      key = "plus"
      break;
    case '-':
      key = "minus"
      break;
    case '/':
      key = "divide"
      break;
    case "*":
      key = "multiply"
      break;
    case "Enter":
      key = "equal"
      break;
   
    case "Backspace":
      key = "backspace"
      break;

    case ".":
      key = "dot"
      break;
   
    case "Delete":
      key = "delete"
      break;
   
    default:
      console.log(currentKey)
      break;
   }
   const button = document.querySelector("." + key);
  //  console.log(button);
   button.classList.add("pressed");
   setTimeout(() => {
     button.classList.remove("pressed");
    
   }, 100);
}

numbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    if (e.target.innerText === "." && haveDot === false) {
      haveDot = true;
    } else if (e.target.innerText === "." && haveDot === true) {
      return;
    }
    current += e.target.innerText;
    currentOutput.innerText = current;
  });
});

operators.map((operator) => {
  operator.addEventListener("click", (e) => {
    if (e.target.innerText === "C") {
      currentOutput.innerText = "";
      previousOutput.innerText = "";
      temporaryResult.innerText = "";
      previous = "";
      current = "";
      tempResult = "";
    } else if (e.target.innerText === "⌦") {
      currentOutput.innerText = currentOutput.innerText.slice(0, -1);
      current = currentOutput.innerText;
    }
    //normal operators + - * /
    else {
      if (!current && !previous) {
        return;
      }

      haveDot = false;
      const operationName = e.target.innerText;
      if(previous && lastOperation && !current){
        // console.log(previous , current);
        previousOutput.innerText = previousOutput.innerText.slice(0,-1);
        previous = previousOutput.innerText;
      }
      else if (current && previous && lastOperation) {
        // console.log(previous , current);
        mathOperation();
        tempResult = result;
        temporaryResult.innerText = tempResult;
      } else {
        result = parseFloat(current);
      }
      clearVar(operationName);
      lastOperation = operationName;
    }
  });
});

const clearVar = (name = "") => {
  previous += current + " " + name + " ";
  previousOutput.innerText = previous;
  currentOutput.innerText = "";
  current = "";
};
const mathOperation = () => {
  if (lastOperation === "X") {
    result = parseFloat(result) * parseFloat(current);
  } else if (lastOperation === "+") {
    result = parseFloat(result) + parseFloat(current);
  } else if (lastOperation === "-") {
    result = parseFloat(result) - parseFloat(current);
  } else if (lastOperation === "/") {
    result = parseFloat(result) / parseFloat(current);
  } else if (lastOperation === "%") {
    result = parseFloat(result) % parseFloat(current);
  }
};

equal.addEventListener("click", (e) => {
  if (!current || !result) {
    return;
  }
  haveDot = false;
  mathOperation();
  clearVar();
  currentOutput.innerText = result;
  temporaryResult.innerText = "";
  current = result;
  previous = "";
  tempResult = "";
});

// to when a someone press button through keyboard
// to perform calci with keyboard also
window.addEventListener("keydown", (e) => {
  if (
    e.key === "0" ||
    e.key === "1" ||
    e.key === "2" ||
    e.key === "3" ||
    e.key === "4" ||
    e.key === "5" ||
    e.key === "6" ||
    e.key === "7" ||
    e.key === "8" ||
    e.key === "9" ||
    e.key === "."
  ) {
    clickButton(e.key);
    //   console.log(e.key)
  } else if (e.key === "+" || e.key === "-" || e.key === "/") {
    // console.log(e.key);
    clickOperation(e.key);
  } else if (e.key === "*") {
    // console.log(e.key);
    clickOperation("X");
  } else if (e.key === "Backspace" ) {
    clickOperation("⌦");
  }else if (e.key === "Delete") {
    clickOperation("C");
  } 
  else if (e.key == "Enter" || e.key === "=") {
    clickEqual();
  }
});

function clickButton(key) {
  numbers.forEach((button) => {
    // console.log(button);
    if (button.innerText === key) {
      button.click();
    }
  });
}
function clickOperation(key) {
  operators.forEach((operation) => {
    // console.log(operation.innerText)
    if (operation.innerText === key) {
      operation.click();
    }
  });
}

function clickEqual() {
  equal.click();
}

