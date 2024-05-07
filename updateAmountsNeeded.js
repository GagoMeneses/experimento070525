///////////funcion de calculo dinamico para calcular lo que falta para pagar el monto total


import { exchangeSources } from './exchangeSources.js';

let rates = {};  // Variable para almacenar las tasas de cambio actuales según la fuente seleccionada

numeral.locale('de');

document.getElementById('exchangeSource').addEventListener('change', function() {
  const source = document.getElementById('exchangeSource').value;
  rates = exchangeSources[source];
  updateAmountsNeeded();
});

function updateAmountsNeeded() {
  const totalAmountToPay = parseFloat(document.getElementById('totalAmountToPay').value) || 0;
  const currencyToPay = document.getElementById('currencyToPay').value;

  let totalPaid = {
    "USD": parseFloat(document.getElementById('amountUSD').value) || 0,
    "EUR": parseFloat(document.getElementById('amountEUR').value) || 0,
    "Bs": parseFloat(document.getElementById('amountBs').value) || 0,
    "COP": parseFloat(document.getElementById('amountCOP').value) || 0
  };

  if (!rates || !currencyToPay || !Object.keys(rates).length) {
    console.error("Las tasas de cambio no están disponibles o no se ha seleccionado una moneda para pagar.");
    return;
  }

  let totalPaidInCurrencyToPay = Object.keys(totalPaid).reduce((acc, currency) => {
    if (rates[currency] && rates[currency][currencyToPay]) {
      return acc + (totalPaid[currency] * rates[currency][currencyToPay]);
    }
    return acc;
  }, 0);

  let difference = totalAmountToPay - totalPaidInCurrencyToPay;
  calculateAndDisplayAmountsNeeded(difference, currencyToPay);
}

// aqui es donde dice son blablabla ? `Son ${numeral(amountNeeded).format('0,0.00')} en ${currency}` 
// function calculateAndDisplayAmountsNeeded(difference, currencyToPay) {
//   Object.keys(rates).forEach(currency => {
//     let resultElement = document.getElementById(`result${currency}`);
//     let amountNeeded = difference * (rates[currencyToPay][currency] || 1);
//     resultElement.textContent = difference > 0 
//         ? `Son ${numeral(amountNeeded).format('0,0.00')} en ${currency}` 
//         : ""; // Format with numeral.js
//   });
// }

// experimento

function calculateAndDisplayAmountsNeeded(difference, currencyToPay) {
  const hasPositiveInput = document.getElementById('amountUSD').value > 0 ||
                           document.getElementById('amountEUR').value > 0 ||
                           document.getElementById('amountBs').value > 0 ||
                           document.getElementById('amountCOP').value > 0;

  Object.keys(rates).forEach(currency => {
    let resultElement = document.getElementById(`result${currency}`);
    let amountNeeded = difference * (rates[currencyToPay][currency] || 1);
    resultElement.textContent = difference > 0 
        ? `${hasPositiveInput ? 'Completa con' : 'Son'} ${numeral(amountNeeded).format('0,0.00')} ${currency}` 
        : ""; // Formateo con numeral.js
  });
}



document.querySelectorAll('input[type="number"], select').forEach(element => {
  element.addEventListener('input', updateAmountsNeeded);
});

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('exchangeSource').dispatchEvent(new Event('change'));
  numeral.locale('de'); // Ensure numeral is configured for German formatting
});

export { updateAmountsNeeded };

