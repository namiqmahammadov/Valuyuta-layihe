let ulFrom = document.querySelector(".ul-from");
let ulFromLi = document.querySelectorAll(".ul-from li");
let ulTo = document.querySelector(".ul-to");
let ulToLi = document.querySelectorAll(".ul-to li");
let fromInput = document.querySelector(".from-input");
let toInput = document.querySelector(".to-input");
let form = document.querySelector(".from-form");
let fromP = document.querySelector(".from-p");
let toP = document.querySelector(".to-p");
let from = "RUB";
let to = "USD";

eventListeners();
checkLi();
getData();

function eventListeners() {
  ulFrom.addEventListener("click", fromValue);
  ulTo.addEventListener("click", toValue);
  fromInput.addEventListener("input", getData);
  ulTo.addEventListener("click", getData);
  ulFrom.addEventListener("click", getData);
}

function getData() {
  fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_nfozWjag1DZ7LnYeaA3YaIofxyWUfXN5qBa9Kr3v&currencies=${to}&base_currency=${from}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      if (data && data.data) {
        let out = Object.values(data.data)[0];
        fromP.innerText = `1 ${from} = ${out} ${to}`;
        toP.innerText = `1 ${to} = ${(1 / out).toFixed(4)} ${from}`;
        calc(out);
      } else {
        throw new Error('Data structure error: Unable to retrieve currency data');
      }
    })
    .catch((err) => {
      console.error("Error fetching data:", err);
    });
}

function fromValue(e) {
  if (e.target.className === "li-from") {
    from = e.target.innerText;
    checkLi();
  }
}

function toValue(e) {
  if (e.target.className === "li-to") {
    to = e.target.innerText;
    checkLi();
  }
}

function calc(out) {
  toInput.value = (parseFloat(fromInput.value.replace(',', '')) * out).toFixed(2);
}

function checkLi() {
  ulFromLi.forEach((item) => {
    item.classList.remove("active");
    if (from == item.innerText) {
      item.classList.add("active");
    }
  });
  ulToLi.forEach((item) => {
    item.classList.remove("active");
    if (to == item.innerText) {
      item.classList.add("active");
    }
  });
}
