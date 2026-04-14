let portfolio = [];
let ticker = document.getElementById("ticker").value.toUpperCase();
let buyPrice = parseFloat.document.getElementById("buyPrice").value;
let currentPrice = parseFloat.document.getElementById("currentPrice").value;
let shares = parseFloat.document.getElementById("shares").value;
if (ticker = " " || isNaN(buyPrice) || isNaN(currentPrice) || isNan(shares)) {
document.getElementsById("msg").textContent = "Please correctly fill all fields."
return;
}
document.getElementById("addButton").addEventListener ("click", function() {
portfolio.push ({ticker: ticker, shares: shares, buyPrice: buyPrice, currentPrice: currentPrice});
document.getElementsById("msg").textContent = ticker + " was added to your portfolio.";
clearInputs();
displayPortfolio(portfolio);
analyzePortfolio(portfolio);
function analyzePortfolio(portfolioList){
let totalInvested = 0;
let totalValue = 0;
for (let i = 0; i < portfolioList.length; i++){
totalInvested += portfolioList[i].shares * portfolioList[i].buyPrice;
totalValue += portfolioList[i].shares * portfolioList[i].currentPrice;
}
let gainLoss = totalValue - totalInvested;
let returnPct = ((gainLoss / totalInvested) * 100).toFixed(2);
if (gainLoss > 0){
document.getElementById("result").textContent = "Portfolio up $" + gainLoss.toFixed(2) + " (" + returnPct + "%)";
document.getElementById("result").style.color = "green";
} else if (gainLoss < 0){
document.getElementById("result").textContent = "Portfolio down $" + Math.abs(gainLoss).toFixed(2) + " (" + returnPct + "%)";
document.getElementById("result").style.color = "red";
} else {
document.getElementById("result").textContent = "Portfolio is break even.";
document.getElementById("result").style.color = "black";
}
document.getElementById("totalInvested").textContent = "Total Invested: $" + totalInvested.toFixed(2);
document.getElementById("totalValue").textContent = "Current Value: $" + totalValue.toFixed(2);
}
})