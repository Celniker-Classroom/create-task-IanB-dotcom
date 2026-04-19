let portfolio = [];

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
}   
    else if (gainLoss < 0){
    document.getElementById("result").textContent = "Portfolio down $" + Math.abs(gainLoss).toFixed(2) + " (" + returnPct + "%)";
    document.getElementById("result").style.color = "red";
} 
    else {
    document.getElementById("result").textContent = "Portfolio is break even.";
    document.getElementById("result").style.color = "black";
}
    document.getElementById("totalInvested").textContent = "Total Invested: $" + totalInvested.toFixed(2);
    document.getElementById("totalValue").textContent = "Current Value: $" + totalValue.toFixed(2);
};

function displayPortfolio(portfolioList){
    let display = document.getElementById("portfolioDisplay");
    display.innerHTML = "";
    for (let i = 0; i < portfolioList.length; i++){
        let item = document.createElement("li");
        item.textContent = portfolioList[i].ticker + " | Shares: " + portfolioList[i].shares
            + " | Buy: $" + portfolioList[i].buyPrice
            + " | Current: $" + portfolioList[i].currentPrice;
        display.appendChild(item);
}
}

function clearInputs(){
    document.getElementById("ticker").value = "";
    document.getElementById("shares").value = "";
    document.getElementById("buyPrice").value = "";
    document.getElementById("currentPrice").value = "";
}

document.getElementById("addBtn").addEventListener ("click", function() {

let ticker = document.getElementById("ticker").value.toUpperCase();
let buyPrice = parseFloat(document.getElementById("buyPrice").value);
let currentPrice = parseFloat(document.getElementById("currentPrice").value); 
let shares = parseFloat(document.getElementById("shares").value); 

if (ticker === "" || isNaN(buyPrice) || isNaN(currentPrice) || isNaN(shares)) {
    document.getElementById("msg").textContent = "Please correctly fill all fields."
    return;
}

portfolio.push ({ticker: ticker, shares: shares, buyPrice: buyPrice, currentPrice: currentPrice});
document.getElementById("msg").textContent = ticker + " was added to your portfolio.";
displayPortfolio(portfolio);
analyzePortfolio(portfolio);
});

document.getElementById("clearBtn").addEventListener ("click", function(){
    clearInputs();
})
