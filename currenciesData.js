/* Request data of the currencies on load */
validateInput();


 /* Create an event listener for the convert button to validate the input and get the currencies data*/
document.getElementById("convertCurrencyButton").addEventListener("click", validateInput);

/* Validate the input data */
function validateInput(){
  let inputNumber = Number(document.getElementById("currencyAmount").value);
  let amountValue = inputNumber.toFixed(2);
  let integerValue = parseInt(amountValue);
  let integerLen = integerValue.toString().length;
  let errMsg = document.getElementById("inputErrMsg");
  if (isNaN(amountValue)) {
    errMsg.innerText = "**Insert a valid number. Example: 10725.77 *Do not include commas or spaces";
  } else if (amountValue < 0.01){
    errMsg.innerText = "**Insert a value between $0.01 and $9999999999.99";
  } else if (integerLen > 10) {
    errMsg.innerText = "**Insert a value between $0.01 and $9999999999.99";
  } else {
    document.getElementById("currencyAmount").value = amountValue;
    errMsg.innerText = "";
    getCurrencies(amountValue);
  }
}

/* Create an event listener for the selects to not use the same currency in both selects */
document.getElementById("currencySource").addEventListener("change", changeSelectSource);
document.getElementById("currencyTarget").addEventListener("change", changeSelectTarget);

/* Function to not use the same currency selecting the source select */
function changeSelectSource() {
  let selectSource = document.getElementById("currencySource").selectedIndex;
  let selectTarget = document.getElementById("currencyTarget").selectedIndex;
  let targetLen = document.getElementById("currencyTarget").options.length-1;
  if (selectSource == selectTarget && selectTarget != targetLen){
    document.getElementById("currencyTarget").selectedIndex += 1;
  } 
  if (selectSource == selectTarget && selectTarget == targetLen){
    document.getElementById("currencyTarget").selectedIndex -= 1;
  }  
}

/* Function to not use the same currency selecting the target select */
function changeSelectTarget() {
  let selectSource = document.getElementById("currencySource").selectedIndex;
  let selectTarget = document.getElementById("currencyTarget").selectedIndex;
  let sourceLen = document.getElementById("currencySource").options.length-1;
  if (selectTarget == selectSource & selectSource != sourceLen){
    document.getElementById("currencySource").selectedIndex += 1;
  } 
  if (selectTarget == selectSource & selectSource == sourceLen){
    document.getElementById("currencySource").selectedIndex -= 1;
  }  
}


/* Create an event listener for the button to change source and target position and get the currencies data */
document.getElementById("changeCurrencyButton").addEventListener("click", changeCurrencyPosition);

/* Change currencies position after clicking the button */
function changeCurrencyPosition() {
  let selectSource = document.getElementById("currencySource").selectedIndex;
  let selectTarget = document.getElementById("currencyTarget").selectedIndex;
  document.getElementById("currencySource").selectedIndex = selectTarget;
  document.getElementById("currencyTarget").selectedIndex = selectSource;
  validateInput();
}


/* Function to get the currencies data */
function getCurrencies(amountValue){
  let requestData = new XMLHttpRequest();
  requestData.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let currenciesResult = JSON.parse(this.responseText);
      myData(currenciesResult, amountValue);
    }
  };
  requestData.open("GET", "https://currencyscoop.p.rapidapi.com/latest");
  requestData.setRequestHeader("x-rapidapi-key", "02a0399372msh670c58894de2d19p1de289jsn50dde2225b05");
  requestData.setRequestHeader("x-rapidapi-host", "currencyscoop.p.rapidapi.com");
  requestData.send();
}

/*Display data*/
function myData(data, amountValue){
  var selectSource = document.getElementById("currencySource").selectedIndex;
  var selectTarget = document.getElementById("currencyTarget").selectedIndex;

  /* Conversion result data */
  if(selectSource == 0 && selectTarget == 1){
    let currency1 = Number(data.response.rates.USD);
    let currency1Figures = currency1.toFixed(4);
    let currency2 = Number(data.response.rates.EUR);
    let currency2Figures = currency2.toFixed(4);
    let conversion =(((currency1Figures*10000)/(currency2Figures*10000))*(amountValue*100))/100;
    let conversionResult = conversion.toFixed(4);
    document.getElementById("exchangeResult").innerHTML = amountValue + " EUR = " + conversionResult +  " USD";
  }else if (selectSource == 0 && selectTarget == 2){
    let currency1 = Number(data.response.rates.GBP);
    let currency1Figures = currency1.toFixed(4);
    let currency2 = Number(data.response.rates.EUR);
    let currency2Figures = currency2.toFixed(4);
    let conversion =(((currency1Figures*10000)/(currency2Figures*10000))*(amountValue*100))/100;
    let conversionResult = conversion.toFixed(4);
    document.getElementById("exchangeResult").innerHTML = amountValue + " EUR = " + conversionResult +  " GBP";
  }else if (selectSource == 0 && selectTarget == 3){
    let currency1 = Number(data.response.rates.JPY);
    let currency1Figures = currency1.toFixed(4);
    let currency2 = Number(data.response.rates.EUR);
    let currency2Figures = currency2.toFixed(4);
    let conversion =(((currency1Figures*10000)/(currency2Figures*10000))*(amountValue*100))/100;
    let conversionResult = conversion.toFixed(3);
    document.getElementById("exchangeResult").innerHTML = amountValue + " EUR = " + conversionResult +  " JPY";
  }else if (selectSource == 0 && selectTarget == 4){
    let currency1 = Number(data.response.rates.CAD);
    let currency1Figures = currency1.toFixed(4);
    let currency2 = Number(data.response.rates.EUR);
    let currency2Figures = currency2.toFixed(4);
    let conversion =(((currency1Figures*10000)/(currency2Figures*10000))*(amountValue*100))/100;
    let conversionResult = conversion.toFixed(4);
    document.getElementById("exchangeResult").innerHTML = amountValue + " EUR = " + conversionResult +  " CAD";
  }else if (selectSource == 0 && selectTarget == 5){
    let currency1 = Number(data.response.rates.CHF);
    let currency1Figures = currency1.toFixed(4);
    let currency2 = Number(data.response.rates.EUR);
    let currency2Figures = currency2.toFixed(4);
    let conversion =(((currency1Figures*10000)/(currency2Figures*10000))*(amountValue*100))/100;
    let conversionResult = conversion.toFixed(4);
    document.getElementById("exchangeResult").innerHTML = amountValue + " EUR = " + conversionResult +  " CHF";
  } else if (selectSource == 1 && selectTarget == 0){
    let currency1 = Number(data.response.rates.EUR);
    let currency1Figures = currency1.toFixed(4);
    let currency2 = Number(data.response.rates.USD);
    let currency2Figures = currency2.toFixed(4);
    let conversion =(((currency1Figures*10000)/(currency2Figures*10000))*(amountValue*100))/100;
    let conversionResult = conversion.toFixed(4);
    document.getElementById("exchangeResult").innerHTML = amountValue + " USD = " + conversionResult +  " EUR";
  }else if (selectSource == 1 && selectTarget == 2){
    let currency1 = Number(data.response.rates.GBP);
    let currency1Figures = currency1.toFixed(4);
    let currency2 = Number(data.response.rates.USD);
    let currency2Figures = currency2.toFixed(4);
    let conversion =(((currency1Figures*10000)/(currency2Figures*10000))*(amountValue*100))/100;
    let conversionResult = conversion.toFixed(4);
    document.getElementById("exchangeResult").innerHTML = amountValue + " USD = " + conversionResult +  " GBP";
  }else if (selectSource == 1 && selectTarget == 3){
    let currency1 = Number(data.response.rates.JPY);
    let currency1Figures = currency1.toFixed(4);
    let currency2 = Number(data.response.rates.USD);
    let currency2Figures = currency2.toFixed(4);
    let conversion =(((currency1Figures*10000)/(currency2Figures*10000))*(amountValue*100))/100;
    let conversionResult = conversion.toFixed(3);
    document.getElementById("exchangeResult").innerHTML = amountValue + " USD = " + conversionResult +  " JPY";
  }else if (selectSource == 1 && selectTarget == 4){
    let currency1 = Number(data.response.rates.CAD);
    let currency1Figures = currency1.toFixed(4);
    let currency2 = Number(data.response.rates.USD);
    let currency2Figures = currency2.toFixed(4);
    let conversion =(((currency1Figures*10000)/(currency2Figures*10000))*(amountValue*100))/100;
    let conversionResult = conversion.toFixed(4);
    document.getElementById("exchangeResult").innerHTML = amountValue + " USD = " + conversionResult +  " CAD";
  }else if (selectSource == 1 && selectTarget == 5){
    let currency1 = Number(data.response.rates.CHF);
    let currency1Figures = currency1.toFixed(4);
    let currency2 = Number(data.response.rates.USD);
    let currency2Figures = currency2.toFixed(4);
    let conversion =(((currency1Figures*10000)/(currency2Figures*10000))*(amountValue*100))/100;
    let conversionResult = conversion.toFixed(4);
    document.getElementById("exchangeResult").innerHTML = amountValue + " USD = " + conversionResult +  " CHF";
  }else if (selectSource == 2 && selectTarget == 0){
    let currency1 = Number(data.response.rates.EUR);
    let currency1Figures = currency1.toFixed(4);
    let currency2 = Number(data.response.rates.GBP);
    let currency2Figures = currency2.toFixed(4);
    let conversion =(((currency1Figures*10000)/(currency2Figures*10000))*(amountValue*100))/100;
    let conversionResult = conversion.toFixed(4);
    document.getElementById("exchangeResult").innerHTML = amountValue + " GBP = " + conversionResult +  " EUR";
  }else if (selectSource == 2 && selectTarget == 1){
    let currency1 = Number(data.response.rates.USD);
    let currency1Figures = currency1.toFixed(4);
    let currency2 = Number(data.response.rates.GBP);
    let currency2Figures = currency2.toFixed(4);
    let conversion =(((currency1Figures*10000)/(currency2Figures*10000))*(amountValue*100))/100;
    let conversionResult = conversion.toFixed(4);
    document.getElementById("exchangeResult").innerHTML = amountValue + " GBP = " + conversionResult +  " USD";
  }else if (selectSource == 2 && selectTarget == 3){
    let currency1 = Number(data.response.rates.JPY);
    let currency1Figures = currency1.toFixed(4);
    let currency2 = Number(data.response.rates.GBP);
    let currency2Figures = currency2.toFixed(4);
    let conversion =(((currency1Figures*10000)/(currency2Figures*10000))*(amountValue*100))/100;
    let conversionResult = conversion.toFixed(3);
    document.getElementById("exchangeResult").innerHTML = amountValue + " GBP = " + conversionResult +  " JPY";
  }else if (selectSource == 2 && selectTarget == 4){
    let currency1 = Number(data.response.rates.CAD);
    let currency1Figures = currency1.toFixed(4);
    let currency2 = Number(data.response.rates.GBP);
    let currency2Figures = currency2.toFixed(4);
    let conversion =(((currency1Figures*10000)/(currency2Figures*10000))*(amountValue*100))/100;
    let conversionResult = conversion.toFixed(4);
    document.getElementById("exchangeResult").innerHTML = amountValue + " GBP = " + conversionResult +  " CAD";
  }else if (selectSource == 2 && selectTarget == 5){
    let currency1 = Number(data.response.rates.CHF);
    let currency1Figures = currency1.toFixed(4);
    let currency2 = Number(data.response.rates.GBP);
    let currency2Figures = currency2.toFixed(4);
    let conversion =(((currency1Figures*10000)/(currency2Figures*10000))*(amountValue*100))/100;
    let conversionResult = conversion.toFixed(4);
    document.getElementById("exchangeResult").innerHTML = amountValue + " GBP = " + conversionResult +  " CHF";
  }else if (selectSource == 3 && selectTarget == 0){
    let currency1 = Number(data.response.rates.EUR);
    let currency1Figures = currency1.toFixed(4);
    let currency2 = Number(data.response.rates.JPY);
    let currency2Figures = currency2.toFixed(4);
    let conversion =(((currency1Figures*10000)/(currency2Figures*10000))*(amountValue*100))/100;
    let conversionResult = conversion.toFixed(4);
    document.getElementById("exchangeResult").innerHTML = amountValue + " JPY = " + conversionResult +  " EUR";
  }else if (selectSource == 3 && selectTarget == 1){
    let currency1 = Number(data.response.rates.USD);
    let currency1Figures = currency1.toFixed(4);
    let currency2 = Number(data.response.rates.JPY);
    let currency2Figures = currency2.toFixed(4);
    let conversion =(((currency1Figures*10000)/(currency2Figures*10000))*(amountValue*100))/100;
    let conversionResult = conversion.toFixed(4);
    document.getElementById("exchangeResult").innerHTML = amountValue + " JPY = " + conversionResult +  " USD";
  }else if (selectSource == 3 && selectTarget == 2){
    let currency1 = Number(data.response.rates.GBP);
    let currency1Figures = currency1.toFixed(4);
    let currency2 = Number(data.response.rates.JPY);
    let currency2Figures = currency2.toFixed(4);
    let conversion =(((currency1Figures*10000)/(currency2Figures*10000))*(amountValue*100))/100;
    let conversionResult = conversion.toFixed(4);
    document.getElementById("exchangeResult").innerHTML = amountValue + " JPY = " + conversionResult +  " GBP";
  }else if (selectSource == 3 && selectTarget == 4){
    let currency1 = Number(data.response.rates.CAD);
    let currency1Figures = currency1.toFixed(4);
    let currency2 = Number(data.response.rates.JPY);
    let currency2Figures = currency2.toFixed(4);
    let conversion =(((currency1Figures*10000)/(currency2Figures*10000))*(amountValue*100))/100;
    let conversionResult = conversion.toFixed(4);
    document.getElementById("exchangeResult").innerHTML = amountValue + " JPY = " + conversionResult +  " CAD";
  }else if (selectSource == 3 && selectTarget == 5){
    let currency1 = Number(data.response.rates.CHF);
    let currency1Figures = currency1.toFixed(4);
    let currency2 = Number(data.response.rates.JPY);
    let currency2Figures = currency2.toFixed(4);
    let conversion =(((currency1Figures*10000)/(currency2Figures*10000))*(amountValue*100))/100;
    let conversionResult = conversion.toFixed(4);
    document.getElementById("exchangeResult").innerHTML = amountValue + " JPY = " + conversionResult +  " CHF";
  }else if (selectSource == 4 && selectTarget == 0){
    let currency1 = Number(data.response.rates.EUR);
    let currency1Figures = currency1.toFixed(4);
    let currency2 = Number(data.response.rates.CAD);
    let currency2Figures = currency2.toFixed(4);
    let conversion =(((currency1Figures*10000)/(currency2Figures*10000))*(amountValue*100))/100;
    let conversionResult = conversion.toFixed(4);
    document.getElementById("exchangeResult").innerHTML = amountValue + " CAD = " + conversionResult +  " EUR";
  }else if (selectSource == 4 && selectTarget == 1){
    let currency1 = Number(data.response.rates.USD);
    let currency1Figures = currency1.toFixed(4);
    let currency2 = Number(data.response.rates.CAD);
    let currency2Figures = currency2.toFixed(4);
    let conversion =(((currency1Figures*10000)/(currency2Figures*10000))*(amountValue*100))/100;
    let conversionResult = conversion.toFixed(4);
    document.getElementById("exchangeResult").innerHTML = amountValue + " CAD = " + conversionResult +  " USD";
  }else if (selectSource == 4 && selectTarget == 2){
    let currency1 = Number(data.response.rates.GBP);
    let currency1Figures = currency1.toFixed(4);
    let currency2 = Number(data.response.rates.CAD);
    let currency2Figures = currency2.toFixed(4);
    let conversion =(((currency1Figures*10000)/(currency2Figures*10000))*(amountValue*100))/100;
    let conversionResult = conversion.toFixed(4);
    document.getElementById("exchangeResult").innerHTML = amountValue + " CAD = " + conversionResult +  " GBP";
  }else if (selectSource == 4 && selectTarget == 3){
    let currency1 = Number(data.response.rates.JPY);
    let currency1Figures = currency1.toFixed(4);
    let currency2 = Number(data.response.rates.CAD);
    let currency2Figures = currency2.toFixed(4);
    let conversion =(((currency1Figures*10000)/(currency2Figures*10000))*(amountValue*100))/100;
    let conversionResult = conversion.toFixed(3);
    document.getElementById("exchangeResult").innerHTML = amountValue + " CAD = " + conversionResult +  " JPY";
  }else if (selectSource == 4 && selectTarget == 5){
    let currency1 = Number(data.response.rates.CHF);
    let currency1Figures = currency1.toFixed(4);
    let currency2 = Number(data.response.rates.CAD);
    let currency2Figures = currency2.toFixed(4);
    let conversion =(((currency1Figures*10000)/(currency2Figures*10000))*(amountValue*100))/100;
    let conversionResult = conversion.toFixed(4);
    document.getElementById("exchangeResult").innerHTML = amountValue + " CAD = " + conversionResult +  " CHF";
  }else if (selectSource == 5 && selectTarget == 0){
    let currency1 = Number(data.response.rates.EUR);
    let currency1Figures = currency1.toFixed(4);
    let currency2 = Number(data.response.rates.CHF);
    let currency2Figures = currency2.toFixed(4);
    let conversion =(((currency1Figures*10000)/(currency2Figures*10000))*(amountValue*100))/100;
    let conversionResult = conversion.toFixed(4);
    document.getElementById("exchangeResult").innerHTML = amountValue + " CHF = " + conversionResult +  " EUR";
  }else if (selectSource == 5 && selectTarget == 1){
    let currency1 = Number(data.response.rates.USD);
    let currency1Figures = currency1.toFixed(4);
    let currency2 = Number(data.response.rates.CHF);
    let currency2Figures = currency2.toFixed(4);
    let conversion =(((currency1Figures*10000)/(currency2Figures*10000))*(amountValue*100))/100;
    let conversionResult = conversion.toFixed(4);
    document.getElementById("exchangeResult").innerHTML = amountValue + " CHF = " + conversionResult +  " USD";
  }else if (selectSource == 5 && selectTarget == 2){
    let currency1 = Number(data.response.rates.GBP);
    let currency1Figures = currency1.toFixed(4);
    let currency2 = Number(data.response.rates.CHF);
    let currency2Figures = currency2.toFixed(4);
    let conversion =(((currency1Figures*10000)/(currency2Figures*10000))*(amountValue*100))/100;
    let conversionResult = conversion.toFixed(4);
    document.getElementById("exchangeResult").innerHTML = amountValue + " CHF = " + conversionResult +  " GBP";
  }else if (selectSource == 5 && selectTarget == 3){
    let currency1 = Number(data.response.rates.JPY);
    let currency1Figures = currency1.toFixed(4);
    let currency2 = Number(data.response.rates.CHF);
    let currency2Figures = currency2.toFixed(4);
    let conversion =(((currency1Figures*10000)/(currency2Figures*10000))*(amountValue*100))/100;
    let conversionResult = conversion.toFixed(3);
    document.getElementById("exchangeResult").innerHTML = amountValue + " CHF = " + conversionResult +  " JPY";
  }else if (selectSource == 5 && selectTarget == 4){
    let currency1 = Number(data.response.rates.CAD);
    let currency1Figures = currency1.toFixed(4);
    let currency2 = Number(data.response.rates.CHF);
    let currency2Figures = currency2.toFixed(4);
    let conversion =(((currency1Figures*10000)/(currency2Figures*10000))*(amountValue*100))/100;
    let conversionResult = conversion.toFixed(4);
    document.getElementById("exchangeResult").innerHTML = amountValue + " CHF = " + conversionResult +  " CAD";
  }


  /* Table data */

  /* Euro row */
  {
    let currency1 = Number(data.response.rates.USD);
    let currency1Figures = currency1.toFixed(4);
    let currency2 = Number(data.response.rates.EUR);
    let currency2Figures = currency2.toFixed(4);
    let conversion = ((currency1Figures*10000)/(currency2Figures*10000));
    let conversionResult = conversion.toFixed(4);
    document.getElementById("eurusd").innerText = conversionResult;
  }
  {
    let currency1 = Number(data.response.rates.GBP);
    let currency1Figures = currency1.toFixed(4);
    let currency2 = Number(data.response.rates.EUR);
    let currency2Figures = currency2.toFixed(4);
    let conversion = ((currency1Figures*10000)/(currency2Figures*10000));
    let conversionResult = conversion.toFixed(4);
    document.getElementById("eurgbp").innerText = conversionResult;
  }
  {
    let currency1 = Number(data.response.rates.CHF);
    let currency1Figures = currency1.toFixed(3);
    let currency2 = Number(data.response.rates.EUR);
    let currency2Figures = currency2.toFixed(4);
    let conversion = ((currency1Figures*10000)/(currency2Figures*10000));
    let conversionResult = conversion.toFixed(4);
    document.getElementById("eurchf").innerText = conversionResult;
  }
  {
    let currency1 = Number(data.response.rates.JPY);
    let currency1Figures = currency1.toFixed(4);
    let currency2 = Number(data.response.rates.EUR);
    let currency2Figures = currency2.toFixed(4);
    let conversion = ((currency1Figures*10000)/(currency2Figures*10000));
    let conversionResult = conversion.toFixed(3);
    document.getElementById("eurjpy").innerText = conversionResult;
  }
  {
    let currency1 = Number(data.response.rates.CAD);
    let currency1Figures = currency1.toFixed(4);
    let currency2 = Number(data.response.rates.EUR);
    let currency2Figures = currency2.toFixed(4);
    let conversion = ((currency1Figures*10000)/(currency2Figures*10000));
    let conversionResult = conversion.toFixed(4);
    document.getElementById("eurcad").innerText = conversionResult;
  }


  /* Dollar row */
  {
    let currency1 = Number(data.response.rates.EUR);
    let currency1Figures = currency1.toFixed(4);
    let currency2 = Number(data.response.rates.USD);
    let currency2Figures = currency2.toFixed(4);
    let conversion = ((currency1Figures*10000)/(currency2Figures*10000));
    let conversionResult = conversion.toFixed(4);
    document.getElementById("usdeur").innerText = conversionResult;
  }
  {
    let currency1 = Number(data.response.rates.GBP);
    let currency1Figures = currency1.toFixed(4);
    let currency2 = Number(data.response.rates.USD);
    let currency2Figures = currency2.toFixed(4);
    let conversion = ((currency1Figures*10000)/(currency2Figures*10000))
    let conversionResult = conversion.toFixed(4);
    document.getElementById("usdgbp").innerText = conversionResult;
  }
  {
    let currency1 = Number(data.response.rates.CHF);
    let currency1Figures = currency1.toFixed(4);
    let currency2 = Number(data.response.rates.USD);
    let currency2Figures = currency2.toFixed(4);
    let conversion = ((currency1Figures*10000)/(currency2Figures*10000))
    let conversionResult = conversion.toFixed(4);
    document.getElementById("usdchf").innerText = conversionResult;
  }
  {
    let currency1 = Number(data.response.rates.JPY);
    let currency1Figures = currency1.toFixed(4);
    let currency2 = Number(data.response.rates.USD);
    let currency2Figures = currency2.toFixed(4);
    let conversion = ((currency1Figures*10000)/(currency2Figures*10000))
    let conversionResult = conversion.toFixed(3);
    document.getElementById("usdjpy").innerText = conversionResult;
  }
  {
    let currency1 = Number(data.response.rates.CAD);
    let currency1Figures = currency1.toFixed(4);
    let currency2 = Number(data.response.rates.USD);
    let currency2Figures = currency2.toFixed(4);
    let conversion = ((currency1Figures*10000)/(currency2Figures*10000))
    let conversionResult = conversion.toFixed(4);
    document.getElementById("usdcad").innerText = conversionResult;
  }


  /* Pound Sterling row */
  {
    let currency1 = Number(data.response.rates.EUR);
    let currency1Figures = currency1.toFixed(4);
    let currency2 = Number(data.response.rates.GBP);
    let currency2Figures = currency2.toFixed(4);
    let conversion = ((currency1Figures*10000)/(currency2Figures*10000));
    let conversionResult = conversion.toFixed(4);
    document.getElementById("gbpeur").innerText = conversionResult;
  }
  {
    let currency1 = Number(data.response.rates.USD);
    let currency1Figures = currency1.toFixed(4);
    let currency2 = Number(data.response.rates.GBP);
    let currency2Figures = currency2.toFixed(4);
    let conversion = ((currency1Figures*10000)/(currency2Figures*10000));
    let conversionResult = conversion.toFixed(4);
    document.getElementById("gbpusd").innerText = conversionResult;
  }
  {
    let currency1 = Number(data.response.rates.CHF);
    let currency1Figures = currency1.toFixed(4);
    let currency2 = Number(data.response.rates.GBP);
    let currency2Figures = currency2.toFixed(4);
    let conversion = ((currency1Figures*10000)/(currency2Figures*10000));
    let conversionResult = conversion.toFixed(4);
    document.getElementById("gbpchf").innerText = conversionResult;
  }
  {
    let currency1 = Number(data.response.rates.JPY);
    let currency1Figures = currency1.toFixed(4);
    let currency2 = Number(data.response.rates.GBP);
    let currency2Figures = currency2.toFixed(4);
    let conversion = ((currency1Figures*10000)/(currency2Figures*10000));
    let conversionResult = conversion.toFixed(3);
    document.getElementById("gbpjpy").innerText = conversionResult;
  }
  {
    let currency1 = Number(data.response.rates.CAD);
    let currency1Figures = currency1.toFixed(4);
    let currency2 = Number(data.response.rates.GBP);
    let currency2Figures = currency2.toFixed(4);
    let conversion = ((currency1Figures*10000)/(currency2Figures*10000));
    let conversionResult = conversion.toFixed(4);
    document.getElementById("gbpcad").innerText = conversionResult;
  }


  /* Swiss Franc row */
  {
    let currency1 = Number(data.response.rates.EUR);
    let currency1Figures = currency1.toFixed(4);
    let currency2 = Number(data.response.rates.CHF);
    let currency2Figures = currency2.toFixed(4);
    let conversion = ((currency1Figures*10000)/(currency2Figures*10000));
    let conversionResult = conversion.toFixed(4);
    document.getElementById("chfeur").innerText = conversionResult;
  }
  {
    let currency1 = Number(data.response.rates.USD);
    let currency1Figures = currency1.toFixed(4);
    let currency2 = Number(data.response.rates.CHF);
    let currency2Figures = currency2.toFixed(4);
    let conversion = ((currency1Figures*10000)/(currency2Figures*10000));
    let conversionResult = conversion.toFixed(4);
    document.getElementById("chfusd").innerText = conversionResult;
  }
  {
    let currency1 = Number(data.response.rates.GBP);
    let currency1Figures = currency1.toFixed(4);
    let currency2 = Number(data.response.rates.CHF);
    let currency2Figures = currency2.toFixed(4);
    let conversion = ((currency1Figures*10000)/(currency2Figures*10000));
    let conversionResult = conversion.toFixed(4);
    document.getElementById("chfgbp").innerText = conversionResult;
  }
  {
    let currency1 = Number(data.response.rates.JPY);
    let currency1Figures = currency1.toFixed(4);
    let currency2 = Number(data.response.rates.CHF);
    let currency2Figures = currency2.toFixed(4);
    let conversion = ((currency1Figures*10000)/(currency2Figures*10000));
    let conversionResult = conversion.toFixed(3);
    document.getElementById("chfjpy").innerText = conversionResult;
  }
  {
    let currency1 = Number(data.response.rates.CAD);
    let currency1Figures = currency1.toFixed(4);
    let currency2 = Number(data.response.rates.CHF);
    let currency2Figures = currency2.toFixed(4);
    let conversion = ((currency1Figures*10000)/(currency2Figures*10000));
    let conversionResult = conversion.toFixed(4);
    document.getElementById("chfcad").innerText = conversionResult;
  }


  /* Yen row */
  {
    let currency1 = Number(data.response.rates.EUR);
    let currency1Figures = currency1.toFixed(4);
    let currency2 = Number(data.response.rates.JPY);
    let currency2Figures = currency2.toFixed(4);
    let conversion = ((currency1Figures*10000)/(currency2Figures*10000));
    let conversionResult = conversion.toFixed(4);
    document.getElementById("jpyeur").innerText = conversionResult;
  }
  {
    let currency1 = Number(data.response.rates.USD);
    let currency1Figures = currency1.toFixed(4);
    let currency2 = Number(data.response.rates.JPY);
    let currency2Figures = currency2.toFixed(4);
    let conversion = ((currency1Figures*10000)/(currency2Figures*10000));
    let conversionResult = conversion.toFixed(4);
    document.getElementById("jpyusd").innerText = conversionResult;
  }
  {
    let currency1 = Number(data.response.rates.GBP);
    let currency1Figures = currency1.toFixed(4);
    let currency2 = Number(data.response.rates.JPY);
    let currency2Figures = currency2.toFixed(4);
    let conversion = ((currency1Figures*10000)/(currency2Figures*10000));
    let conversionResult = conversion.toFixed(4);
    document.getElementById("jpygbp").innerText = conversionResult;
  }
  {
    let currency1 = Number(data.response.rates.CHF);
    let currency1Figures = currency1.toFixed(4);
    let currency2 = Number(data.response.rates.JPY);
    let currency2Figures = currency2.toFixed(4);
    let conversion = ((currency1Figures*10000)/(currency2Figures*10000));
    let conversionResult = conversion.toFixed(4);
    document.getElementById("jpychf").innerText = conversionResult;
  }
  {
    let currency1 = Number(data.response.rates.CAD);
    let currency1Figures = currency1.toFixed(4);
    let currency2 = Number(data.response.rates.JPY);
    let currency2Figures = currency2.toFixed(4);
    let conversion = ((currency1Figures*10000)/(currency2Figures*10000));
    let conversionResult = conversion.toFixed(4);
    document.getElementById("jpycad").innerText = conversionResult;
  }


  /* Canadian Dollar row */
  {
    let currency1 = Number(data.response.rates.EUR);
    let currency1Figures = currency1.toFixed(4);
    let currency2 = Number(data.response.rates.CAD);
    let currency2Figures = currency2.toFixed(4);
    let conversion = ((currency1Figures*10000)/(currency2Figures*10000));
    let conversionResult = conversion.toFixed(4);
    document.getElementById("cadeur").innerText = conversionResult;
  }
  {
    let currency1 = Number(data.response.rates.USD);
    let currency1Figures = currency1.toFixed(4);
    let currency2 = Number(data.response.rates.CAD);
    let currency2Figures = currency2.toFixed(4);
    let conversion = ((currency1Figures*10000)/(currency2Figures*10000));
    let conversionResult = conversion.toFixed(4);
    document.getElementById("cadusd").innerText = conversionResult;
  }
  {
    let currency1 = Number(data.response.rates.GBP);
    let currency1Figures = currency1.toFixed(4);
    let currency2 = Number(data.response.rates.CAD);
    let currency2Figures = currency2.toFixed(4);
    let conversion = ((currency1Figures*10000)/(currency2Figures*10000));
    let conversionResult = conversion.toFixed(4);
    document.getElementById("cadgbp").innerText = conversionResult;
  }
  {
    let currency1 = Number(data.response.rates.CHF);
    let currency1Figures = currency1.toFixed(4);
    let currency2 = Number(data.response.rates.CAD);
    let currency2Figures = currency2.toFixed(4);
    let conversion = ((currency1Figures*10000)/(currency2Figures*10000));
    let conversionResult = conversion.toFixed(4);
    document.getElementById("cadchf").innerText = conversionResult;
  }
  {
    let currency1 = Number(data.response.rates.JPY);
    let currency1Figures = currency1.toFixed(4);
    let currency2 = Number(data.response.rates.CAD);
    let currency2Figures = currency2.toFixed(4);
    let conversion = ((currency1Figures*10000)/(currency2Figures*10000));
    let conversionResult = conversion.toFixed(3);
    document.getElementById("cadjpy").innerText = conversionResult;
  }
 
}

