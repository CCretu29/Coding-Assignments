async function getExchangeRate(currency) {
    try {
        let response = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`);
        let data = await response.json();
        return data.rates[currency];
    } catch(error) {
        console.error("Error fetching data:", error);
    }
}

async function convertCurrency() {
    let usdAmount = parseFloat(document.getElementById('usdAmount').value);
    let currency = document.getElementById('currencySelect').value;
    
    let exchangeRate = await getExchangeRate(currency);
    
    if (exchangeRate) {
        let convertedAmount = usdAmount * exchangeRate;
        document.getElementById('convertedAmountValue').textContent = convertedAmount.toFixed(2);
    } else {
        console.error("Exchange rate not available for the selected currency.");
    }
}

document.getElementById('convertButton').addEventListener('click', convertCurrency);
