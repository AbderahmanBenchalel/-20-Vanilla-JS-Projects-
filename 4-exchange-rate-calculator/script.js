////// Accessing DOM elements.
const baseSelect = document.getElementById("from");
const targetSelect = document.getElementById("to");
const inputBaseAmount = document.querySelector(".amount-from");
const targetAmount = document.querySelector(".amount-to");
const swapButton = document.querySelector(".swap-button");
const rate = document.querySelector(".rate");
let data = {};

////// The application.
standeredValues();
baseSelect.addEventListener("change", changeBaseAndTargetHandling);
targetSelect.addEventListener("change", changeBaseAndTargetHandling);
swapButton.addEventListener("click", swapCurrencyHandling);
inputBaseAmount.addEventListener("input", inputAmountHandling);

////// Functions.

// Standered values of base, target and rate information.
async function standeredValues() {
  data = await requestConversion(baseSelect.value, targetSelect.value);
  calculateExchange(data.conversion_rate);
  viewRateUI(data.base_code, data.target_code, data.conversion_rate);
}

async function requestConversion(base, target) {
  const resonse = await fetch(
    `https://v6.exchangerate-api.com/v6/34a9550c6b7fa37cb3baf39a/pair/${base}/${target}`
  );
  return resonse.json();
}

async function changeBaseAndTargetHandling(event) {
  data = await requestConversion(baseSelect.value, targetSelect.value);
  calculateExchange(data.conversion_rate);
  viewRateUI(data.base_code, data.target_code, data.conversion_rate);
}

function calculateExchange(conversionRate) {
  targetAmount.value = (inputBaseAmount.value * conversionRate).toFixed(2);
}
function viewRateUI(base, target, conversionRate) {
  rate.innerText = `1 ${base} = ${target} ${conversionRate}`;
}

function swapCurrencyHandling() {
  const swap = baseSelect.value;
  baseSelect.value = targetSelect.value;
  targetSelect.value = swap;

  if (baseSelect.value === data.base_code) {
    calculateExchange(data.conversion_rate);
    viewRateUI(baseSelect.value, targetSelect.value, data.conversion_rate);
    return;
  }
  calculateExchange(1 / data.conversion_rate);
  viewRateUI(
    baseSelect.value,
    targetSelect.value,
    (1 / data.conversion_rate).toFixed(2)
  );
}

function inputAmountHandling() {
  if (baseSelect.value === data.base_code)
    calculateExchange(data.conversion_rate);
  else calculateExchange(1 / data.conversion_rate);
}
