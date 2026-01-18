const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let current = "";
let operator = "";
let firstValue = "";

buttons.forEach(btn => {
   btn.addEventListener("click", () => {
      handleClick(btn.innerText);
   })
});

function handleClick(value) {
   if(!isNaN(value)|| value===".") {
      current = current + value;
      updateDisplay(current);
      return;
   }
   if(value==="C") {
      current= "";
      firstValue="";
      operator= "";
      updateDisplay("0");
      return;
   }
   if(value==="U") {
      current=current.slice(0, -1);
      updateDisplay(current||"0");
      return;
   }
   if(value==="%") {
      current = (parseFloat(current)/100).toString();
      updateDisplay(current);
      return;
   }
   if(["+", "-", "*", "÷"].includes(value)) {
      firstValue = current;
      operator=value;
      updateDisplay(current+value);
      current = "";
      return;
   }
   if(value==="=") {
      const secondValue = current;
      let result = calculate(firstValue, secondValue, operator);
      updateDisplay(result);
      current = result.toString();
   }
}

function updateDisplay(value) {
   display.innerHTML=value;
}

function calculate(a, b, op) {
   a = parseFloat(a);
   b = parseFloat(b);

   if (op === "+") return a + b;
   if (op === "-") return a - b;
   if (op === "*") return a * b;
   if (op === "÷") return b === 0 ? "Error" : a / b;
}