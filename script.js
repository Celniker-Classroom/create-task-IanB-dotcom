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
    updateSummary(portfolioList, gainLoss, totalValue);
};

function displayPortfolio(portfolioList){
    let display = document.getElementById("portfolioDisplay");
    display.innerHTML = "";
    for (let i = 0; i < portfolioList.length; i++){
        let item = document.createElement("li");
        item.textContent = portfolioList[i].ticker + " | Shares: " + portfolioList[i].shares
            + " | Buy: $" + portfolioList[i].buyPrice
            + " | Current: $" + portfolioList[i].currentPrice;
        let stockReturn = ((portfolioList[i].currentPrice - portfolioList[i].buyPrice) / portfolioList[i].buyPrice * 100).toFixed(2);
        let arrow = stockReturn >= 0 ? "▲" : "▼";
        item.textContent += " | " + arrow + " " + Math.abs(stockReturn) + "%";
        item.style.color = stockReturn >= 0 ? "green" : "red";
        display.appendChild(item);
}
}

function clearInputs(){
    document.getElementById("ticker").value = "";
    document.getElementById("shares").value = "";
    document.getElementById("buyPrice").value = "";
    document.getElementById("currentPrice").value = "";
}

let portfolio = [];
let pieChart = null;
let barChart = null;

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
updateChart(portfolio);
});

document.getElementById("clearBtn").addEventListener ("click", function(){
    clearInputs();
})

document.getElementById("clearPortfolio").addEventListener("click", function() {
  portfolio = [];
  if (pieChart) { pieChart.destroy(); pieChart = null; }
  if (barChart) { barChart.destroy(); barChart = null; }
  document.getElementById("portfolioDisplay").innerHTML = "";
  document.getElementById("totalInvested").textContent = "";
  document.getElementById("totalValue").textContent = "";
  document.getElementById("result").textContent = "";
  document.getElementById("msg").textContent = "Portfolio cleared.";
    document.getElementById("summary").style.display = "none";
});

// The pie chart and bar chart below was made with help from the inbuilt AI bot. The bot helped fix bugs are construct the general format. 
// (Originally my pie chart didnt update the chart immediately and the bot helped fixed this. General structure for the bichart was aided by the ai).

function updateChart(portfolioList) {
  let labels = portfolioList.map(stock => stock.ticker);
  let values = portfolioList.map(stock => stock.shares * stock.currentPrice);
  let colors = ["#d4a847", "#3fb950", "#58a6ff", "#f85149", "#bc8cff", "#ffa657"];

  const pieCtx = document.getElementById("pieChart").getContext("2d");
  const barCtx = document.getElementById("barChart").getContext("2d");

  if (pieChart) {
    pieChart.data.labels = labels;
    pieChart.data.datasets[0].data = values;
    pieChart.data.datasets[0].backgroundColor = colors.slice(0, values.length);
    pieChart.update();
  } else {
    pieChart = new Chart(pieCtx, {
      type: "pie",
      data: {
        labels,
        datasets: [{
          data: values,
          backgroundColor: colors.slice(0, values.length)
        }]
      },
      options: { plugins: { legend: { position: "bottom" } } }
    });
  }

  if (barChart) {
    barChart.data.labels = labels;
    barChart.data.datasets[0].data = values;
    barChart.update();
  } else {
    barChart = new Chart(barCtx, {
      type: "bar",
      data: {
        labels,
        datasets: [{
          label: "Market Value",
          data: values,
          backgroundColor: colors.slice(0, values.length)
        }]
      },
      options: {
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }
}

function updateSummary(portfolioList, gainLoss, totalValue) {
  const card = document.getElementById("summary");
  if (portfolioList.length === 0) { card.style.display = "none"; return; }

  const count = portfolioList.length;

  let diversification;
  if (count >= 7) {
    diversification = "well diversified";
  } else if (count >= 4) {
    diversification = "moderately diversified";
  } else {
    diversification = "concentrated"; }

  let size;
  if (totalValue >= 100000) {
    size = "large";
  } else if (totalValue >= 25000) {
    size = "mid-size";
  } else {
    size = "small";
  }

  const bias = portfolioList.filter(s => ((s.currentPrice - s.buyPrice) / s.buyPrice) > 0.15).length;

  let growthLabel;
  if (bias >= Math.ceil(count / 2)) {
    growthLabel = "growth-oriented";
  } else {
    growthLabel = "value-oriented";
  }

  let pluralHolding;
  if (count > 1) {
    pluralHolding = "holdings";
  } else {
    pluralHolding = "holding";
  }

  let gainPrefix;
  if (gainLoss >= 0) {
    gainPrefix = "+$";
  } else {
    gainPrefix = "-$";
  }

  document.getElementById("sumCount").textContent = count + " " + pluralHolding + " — " + diversification + ", " + growthLabel + ".";
  document.getElementById("sumSize").textContent = "Portfolio size: " + size + " ($" + totalValue.toFixed(2) + " market value).";
  document.getElementById("sumGain").textContent = "Net P&L: " + gainPrefix + Math.abs(gainLoss).toFixed(2);
  card.style.display = "block";
}