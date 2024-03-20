const BASE_URL ="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("#ExchangeButton");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const swap = document.querySelector("#swap");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const swapping = () => {
  // Swap the values of fromCurr and toCurr select elements
  
  const temp = fromCurr.value;
  fromCurr.value = toCurr.value;
  toCurr.value = temp;

  // Update the flag images based on the new selections
  updateFlag(fromCurr);
  updateFlag(toCurr);

  // Update the exchange rate based on the new selections
  updateExchangeRate();
};

swap.addEventListener("click", (evt) => {
  evt.preventDefault(); // Prevent the default button behavior
  swapping(); // Execute the swapping function
});

const updateExchangeRate = async () => {
  
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  // console.log(amount.value)
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  //  console.log(amount.value);
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  //  console.log(data)
  
  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
  
  //  console.log(data);
  let finalAmount = amtVal * rate;
  //  console.log(finalAmount);
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
  //  console.log(msg);
};

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault(); // Prevent the default form submission behavior

  // Update the exchange rate
  await updateExchangeRate();
});


window.addEventListener("load", () => {
  updateExchangeRate();
});