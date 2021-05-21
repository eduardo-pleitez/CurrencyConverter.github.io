// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"currenciesData.js":[function(require,module,exports) {
/* Request data of the currencies on load */
validateInput();
/* Create an event listener for the convert button to validate the input and get the currencies data*/

document.getElementById("convertCurrencyButton").addEventListener("click", validateInput);
/* Validate the input data */

function validateInput() {
  var inputNumber = Number(document.getElementById("currencyAmount").value);
  var amountValue = inputNumber.toFixed(2);
  var integerValue = parseInt(amountValue);
  var integerLen = integerValue.toString().length;
  var errMsg = document.getElementById("inputErrMsg");

  if (isNaN(amountValue)) {
    errMsg.innerText = "**Insert a valid number. Example: 10725.77 *Do not include commas or spaces";
  } else if (amountValue < 0.01) {
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
  var selectSource = document.getElementById("currencySource").selectedIndex;
  var selectTarget = document.getElementById("currencyTarget").selectedIndex;
  var targetLen = document.getElementById("currencyTarget").options.length - 1;

  if (selectSource == selectTarget & selectTarget != targetLen) {
    document.getElementById("currencyTarget").selectedIndex += 1;
  }

  if (selectSource == selectTarget & selectTarget == targetLen) {
    document.getElementById("currencyTarget").selectedIndex -= 1;
  }
}
/* Function to not use the same currency selecting the target select */


function changeSelectTarget() {
  var selectSource = document.getElementById("currencySource").selectedIndex;
  var selectTarget = document.getElementById("currencyTarget").selectedIndex;
  var sourceLen = document.getElementById("currencySource").options.length - 1;

  if (selectTarget == selectSource & selectSource != sourceLen) {
    document.getElementById("currencySource").selectedIndex += 1;
  }

  if (selectTarget == selectSource & selectSource == sourceLen) {
    document.getElementById("currencySource").selectedIndex -= 1;
  }
}
/* Create an event listener for the button to change source and target position and get the currencies data */


document.getElementById("changeCurrencyButton").addEventListener("click", changeCurrencyPosition);
/* Change currencies position after clicking the button */

function changeCurrencyPosition() {
  var selectSource = document.getElementById("currencySource").selectedIndex;
  var selectTarget = document.getElementById("currencyTarget").selectedIndex;
  document.getElementById("currencySource").selectedIndex = selectTarget;
  document.getElementById("currencyTarget").selectedIndex = selectSource;
  validateInput();
}
/* Function to get the currencies data */


function getCurrencies(amountValue) {
  var requestData = new XMLHttpRequest();

  requestData.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var currenciesResult = JSON.parse(this.responseText);
      myData(currenciesResult, amountValue);
    }
  };

  requestData.open("GET", "https://currencyscoop.p.rapidapi.com/latest");
  requestData.setRequestHeader("x-rapidapi-key", "02a0399372msh670c58894de2d19p1de289jsn50dde2225b05");
  requestData.setRequestHeader("x-rapidapi-host", "currencyscoop.p.rapidapi.com");
  requestData.send();
}
/*Display data*/


function myData(data, amountValue) {
  var selectSource = document.getElementById("currencySource").selectedIndex;
  var selectTarget = document.getElementById("currencyTarget").selectedIndex;
  /* Conversion result data */

  if (selectSource == 0 && selectTarget == 1) {
    var currency1 = Number(data.response.rates.USD);
    var currency1Figures = currency1.toFixed(4);
    var currency2 = Number(data.response.rates.EUR);
    var currency2Figures = currency2.toFixed(4);
    var conversion = currency1Figures * 10000 / (currency2Figures * 10000) * (amountValue * 100) / 100;
    var conversionResult = conversion.toFixed(4);
    document.getElementById("exchangeResult").innerHTML = amountValue + " EUR = " + conversionResult + " USD";
  } else if (selectSource == 0 && selectTarget == 2) {
    var _currency = Number(data.response.rates.GBP);

    var _currency1Figures = _currency.toFixed(4);

    var _currency2 = Number(data.response.rates.EUR);

    var _currency2Figures = _currency2.toFixed(4);

    var _conversion = _currency1Figures * 10000 / (_currency2Figures * 10000) * (amountValue * 100) / 100;

    var _conversionResult = _conversion.toFixed(4);

    document.getElementById("exchangeResult").innerHTML = amountValue + " EUR = " + _conversionResult + " GBP";
  } else if (selectSource == 0 && selectTarget == 3) {
    var _currency3 = Number(data.response.rates.JPY);

    var _currency1Figures2 = _currency3.toFixed(4);

    var _currency4 = Number(data.response.rates.EUR);

    var _currency2Figures2 = _currency4.toFixed(4);

    var _conversion2 = _currency1Figures2 * 10000 / (_currency2Figures2 * 10000) * (amountValue * 100) / 100;

    var _conversionResult2 = _conversion2.toFixed(3);

    document.getElementById("exchangeResult").innerHTML = amountValue + " EUR = " + _conversionResult2 + " JPY";
  } else if (selectSource == 0 && selectTarget == 4) {
    var _currency5 = Number(data.response.rates.CAD);

    var _currency1Figures3 = _currency5.toFixed(4);

    var _currency6 = Number(data.response.rates.EUR);

    var _currency2Figures3 = _currency6.toFixed(4);

    var _conversion3 = _currency1Figures3 * 10000 / (_currency2Figures3 * 10000) * (amountValue * 100) / 100;

    var _conversionResult3 = _conversion3.toFixed(4);

    document.getElementById("exchangeResult").innerHTML = amountValue + " EUR = " + _conversionResult3 + " CAD";
  } else if (selectSource == 0 && selectTarget == 5) {
    var _currency7 = Number(data.response.rates.CHF);

    var _currency1Figures4 = _currency7.toFixed(4);

    var _currency8 = Number(data.response.rates.EUR);

    var _currency2Figures4 = _currency8.toFixed(4);

    var _conversion4 = _currency1Figures4 * 10000 / (_currency2Figures4 * 10000) * (amountValue * 100) / 100;

    var _conversionResult4 = _conversion4.toFixed(4);

    document.getElementById("exchangeResult").innerHTML = amountValue + " EUR = " + _conversionResult4 + " CHF";
  } else if (selectSource == 1 && selectTarget == 0) {
    var _currency9 = Number(data.response.rates.EUR);

    var _currency1Figures5 = _currency9.toFixed(4);

    var _currency10 = Number(data.response.rates.USD);

    var _currency2Figures5 = _currency10.toFixed(4);

    var _conversion5 = _currency1Figures5 * 10000 / (_currency2Figures5 * 10000) * (amountValue * 100) / 100;

    var _conversionResult5 = _conversion5.toFixed(4);

    document.getElementById("exchangeResult").innerHTML = amountValue + " USD = " + _conversionResult5 + " EUR";
  } else if (selectSource == 1 && selectTarget == 2) {
    var _currency11 = Number(data.response.rates.GBP);

    var _currency1Figures6 = _currency11.toFixed(4);

    var _currency12 = Number(data.response.rates.USD);

    var _currency2Figures6 = _currency12.toFixed(4);

    var _conversion6 = _currency1Figures6 * 10000 / (_currency2Figures6 * 10000) * (amountValue * 100) / 100;

    var _conversionResult6 = _conversion6.toFixed(4);

    document.getElementById("exchangeResult").innerHTML = amountValue + " USD = " + _conversionResult6 + " GBP";
  } else if (selectSource == 1 && selectTarget == 3) {
    var _currency13 = Number(data.response.rates.JPY);

    var _currency1Figures7 = _currency13.toFixed(4);

    var _currency14 = Number(data.response.rates.USD);

    var _currency2Figures7 = _currency14.toFixed(4);

    var _conversion7 = _currency1Figures7 * 10000 / (_currency2Figures7 * 10000) * (amountValue * 100) / 100;

    var _conversionResult7 = _conversion7.toFixed(3);

    document.getElementById("exchangeResult").innerHTML = amountValue + " USD = " + _conversionResult7 + " JPY";
  } else if (selectSource == 1 && selectTarget == 4) {
    var _currency15 = Number(data.response.rates.CAD);

    var _currency1Figures8 = _currency15.toFixed(4);

    var _currency16 = Number(data.response.rates.USD);

    var _currency2Figures8 = _currency16.toFixed(4);

    var _conversion8 = _currency1Figures8 * 10000 / (_currency2Figures8 * 10000) * (amountValue * 100) / 100;

    var _conversionResult8 = _conversion8.toFixed(4);

    document.getElementById("exchangeResult").innerHTML = amountValue + " USD = " + _conversionResult8 + " CAD";
  } else if (selectSource == 1 && selectTarget == 5) {
    var _currency17 = Number(data.response.rates.CHF);

    var _currency1Figures9 = _currency17.toFixed(4);

    var _currency18 = Number(data.response.rates.USD);

    var _currency2Figures9 = _currency18.toFixed(4);

    var _conversion9 = _currency1Figures9 * 10000 / (_currency2Figures9 * 10000) * (amountValue * 100) / 100;

    var _conversionResult9 = _conversion9.toFixed(4);

    document.getElementById("exchangeResult").innerHTML = amountValue + " USD = " + _conversionResult9 + " CHF";
  } else if (selectSource == 2 && selectTarget == 0) {
    var _currency19 = Number(data.response.rates.EUR);

    var _currency1Figures10 = _currency19.toFixed(4);

    var _currency20 = Number(data.response.rates.GBP);

    var _currency2Figures10 = _currency20.toFixed(4);

    var _conversion10 = _currency1Figures10 * 10000 / (_currency2Figures10 * 10000) * (amountValue * 100) / 100;

    var _conversionResult10 = _conversion10.toFixed(4);

    document.getElementById("exchangeResult").innerHTML = amountValue + " GBP = " + _conversionResult10 + " EUR";
  } else if (selectSource == 2 && selectTarget == 1) {
    var _currency21 = Number(data.response.rates.USD);

    var _currency1Figures11 = _currency21.toFixed(4);

    var _currency22 = Number(data.response.rates.GBP);

    var _currency2Figures11 = _currency22.toFixed(4);

    var _conversion11 = _currency1Figures11 * 10000 / (_currency2Figures11 * 10000) * (amountValue * 100) / 100;

    var _conversionResult11 = _conversion11.toFixed(4);

    document.getElementById("exchangeResult").innerHTML = amountValue + " GBP = " + _conversionResult11 + " USD";
  } else if (selectSource == 2 && selectTarget == 3) {
    var _currency23 = Number(data.response.rates.JPY);

    var _currency1Figures12 = _currency23.toFixed(4);

    var _currency24 = Number(data.response.rates.GBP);

    var _currency2Figures12 = _currency24.toFixed(4);

    var _conversion12 = _currency1Figures12 * 10000 / (_currency2Figures12 * 10000) * (amountValue * 100) / 100;

    var _conversionResult12 = _conversion12.toFixed(3);

    document.getElementById("exchangeResult").innerHTML = amountValue + " GBP = " + _conversionResult12 + " JPY";
  } else if (selectSource == 2 && selectTarget == 4) {
    var _currency25 = Number(data.response.rates.CAD);

    var _currency1Figures13 = _currency25.toFixed(4);

    var _currency26 = Number(data.response.rates.GBP);

    var _currency2Figures13 = _currency26.toFixed(4);

    var _conversion13 = _currency1Figures13 * 10000 / (_currency2Figures13 * 10000) * (amountValue * 100) / 100;

    var _conversionResult13 = _conversion13.toFixed(4);

    document.getElementById("exchangeResult").innerHTML = amountValue + " GBP = " + _conversionResult13 + " CAD";
  } else if (selectSource == 2 && selectTarget == 5) {
    var _currency27 = Number(data.response.rates.CHF);

    var _currency1Figures14 = _currency27.toFixed(4);

    var _currency28 = Number(data.response.rates.GBP);

    var _currency2Figures14 = _currency28.toFixed(4);

    var _conversion14 = _currency1Figures14 * 10000 / (_currency2Figures14 * 10000) * (amountValue * 100) / 100;

    var _conversionResult14 = _conversion14.toFixed(4);

    document.getElementById("exchangeResult").innerHTML = amountValue + " GBP = " + _conversionResult14 + " CHF";
  } else if (selectSource == 3 && selectTarget == 0) {
    var _currency29 = Number(data.response.rates.EUR);

    var _currency1Figures15 = _currency29.toFixed(4);

    var _currency30 = Number(data.response.rates.JPY);

    var _currency2Figures15 = _currency30.toFixed(4);

    var _conversion15 = _currency1Figures15 * 10000 / (_currency2Figures15 * 10000) * (amountValue * 100) / 100;

    var _conversionResult15 = _conversion15.toFixed(4);

    document.getElementById("exchangeResult").innerHTML = amountValue + " JPY = " + _conversionResult15 + " EUR";
  } else if (selectSource == 3 && selectTarget == 1) {
    var _currency31 = Number(data.response.rates.USD);

    var _currency1Figures16 = _currency31.toFixed(4);

    var _currency32 = Number(data.response.rates.JPY);

    var _currency2Figures16 = _currency32.toFixed(4);

    var _conversion16 = _currency1Figures16 * 10000 / (_currency2Figures16 * 10000) * (amountValue * 100) / 100;

    var _conversionResult16 = _conversion16.toFixed(4);

    document.getElementById("exchangeResult").innerHTML = amountValue + " JPY = " + _conversionResult16 + " USD";
  } else if (selectSource == 3 && selectTarget == 2) {
    var _currency33 = Number(data.response.rates.GBP);

    var _currency1Figures17 = _currency33.toFixed(4);

    var _currency34 = Number(data.response.rates.JPY);

    var _currency2Figures17 = _currency34.toFixed(4);

    var _conversion17 = _currency1Figures17 * 10000 / (_currency2Figures17 * 10000) * (amountValue * 100) / 100;

    var _conversionResult17 = _conversion17.toFixed(4);

    document.getElementById("exchangeResult").innerHTML = amountValue + " JPY = " + _conversionResult17 + " GBP";
  } else if (selectSource == 3 && selectTarget == 4) {
    var _currency35 = Number(data.response.rates.CAD);

    var _currency1Figures18 = _currency35.toFixed(4);

    var _currency36 = Number(data.response.rates.JPY);

    var _currency2Figures18 = _currency36.toFixed(4);

    var _conversion18 = _currency1Figures18 * 10000 / (_currency2Figures18 * 10000) * (amountValue * 100) / 100;

    var _conversionResult18 = _conversion18.toFixed(4);

    document.getElementById("exchangeResult").innerHTML = amountValue + " JPY = " + _conversionResult18 + " CAD";
  } else if (selectSource == 3 && selectTarget == 5) {
    var _currency37 = Number(data.response.rates.CHF);

    var _currency1Figures19 = _currency37.toFixed(4);

    var _currency38 = Number(data.response.rates.JPY);

    var _currency2Figures19 = _currency38.toFixed(4);

    var _conversion19 = _currency1Figures19 * 10000 / (_currency2Figures19 * 10000) * (amountValue * 100) / 100;

    var _conversionResult19 = _conversion19.toFixed(4);

    document.getElementById("exchangeResult").innerHTML = amountValue + " JPY = " + _conversionResult19 + " CHF";
  } else if (selectSource == 4 && selectTarget == 0) {
    var _currency39 = Number(data.response.rates.EUR);

    var _currency1Figures20 = _currency39.toFixed(4);

    var _currency40 = Number(data.response.rates.CAD);

    var _currency2Figures20 = _currency40.toFixed(4);

    var _conversion20 = _currency1Figures20 * 10000 / (_currency2Figures20 * 10000) * (amountValue * 100) / 100;

    var _conversionResult20 = _conversion20.toFixed(4);

    document.getElementById("exchangeResult").innerHTML = amountValue + " CAD = " + _conversionResult20 + " EUR";
  } else if (selectSource == 4 && selectTarget == 1) {
    var _currency41 = Number(data.response.rates.USD);

    var _currency1Figures21 = _currency41.toFixed(4);

    var _currency42 = Number(data.response.rates.CAD);

    var _currency2Figures21 = _currency42.toFixed(4);

    var _conversion21 = _currency1Figures21 * 10000 / (_currency2Figures21 * 10000) * (amountValue * 100) / 100;

    var _conversionResult21 = _conversion21.toFixed(4);

    document.getElementById("exchangeResult").innerHTML = amountValue + " CAD = " + _conversionResult21 + " USD";
  } else if (selectSource == 4 && selectTarget == 2) {
    var _currency43 = Number(data.response.rates.GBP);

    var _currency1Figures22 = _currency43.toFixed(4);

    var _currency44 = Number(data.response.rates.CAD);

    var _currency2Figures22 = _currency44.toFixed(4);

    var _conversion22 = _currency1Figures22 * 10000 / (_currency2Figures22 * 10000) * (amountValue * 100) / 100;

    var _conversionResult22 = _conversion22.toFixed(4);

    document.getElementById("exchangeResult").innerHTML = amountValue + " CAD = " + _conversionResult22 + " GBP";
  } else if (selectSource == 4 && selectTarget == 3) {
    var _currency45 = Number(data.response.rates.JPY);

    var _currency1Figures23 = _currency45.toFixed(4);

    var _currency46 = Number(data.response.rates.CAD);

    var _currency2Figures23 = _currency46.toFixed(4);

    var _conversion23 = _currency1Figures23 * 10000 / (_currency2Figures23 * 10000) * (amountValue * 100) / 100;

    var _conversionResult23 = _conversion23.toFixed(3);

    document.getElementById("exchangeResult").innerHTML = amountValue + " CAD = " + _conversionResult23 + " JPY";
  } else if (selectSource == 4 && selectTarget == 5) {
    var _currency47 = Number(data.response.rates.CHF);

    var _currency1Figures24 = _currency47.toFixed(4);

    var _currency48 = Number(data.response.rates.CAD);

    var _currency2Figures24 = _currency48.toFixed(4);

    var _conversion24 = _currency1Figures24 * 10000 / (_currency2Figures24 * 10000) * (amountValue * 100) / 100;

    var _conversionResult24 = _conversion24.toFixed(4);

    document.getElementById("exchangeResult").innerHTML = amountValue + " CAD = " + _conversionResult24 + " CHF";
  } else if (selectSource == 5 && selectTarget == 0) {
    var _currency49 = Number(data.response.rates.EUR);

    var _currency1Figures25 = _currency49.toFixed(4);

    var _currency50 = Number(data.response.rates.CHF);

    var _currency2Figures25 = _currency50.toFixed(4);

    var _conversion25 = _currency1Figures25 * 10000 / (_currency2Figures25 * 10000) * (amountValue * 100) / 100;

    var _conversionResult25 = _conversion25.toFixed(4);

    document.getElementById("exchangeResult").innerHTML = amountValue + " CHF = " + _conversionResult25 + " EUR";
  } else if (selectSource == 5 && selectTarget == 1) {
    var _currency51 = Number(data.response.rates.USD);

    var _currency1Figures26 = _currency51.toFixed(4);

    var _currency52 = Number(data.response.rates.CHF);

    var _currency2Figures26 = _currency52.toFixed(4);

    var _conversion26 = _currency1Figures26 * 10000 / (_currency2Figures26 * 10000) * (amountValue * 100) / 100;

    var _conversionResult26 = _conversion26.toFixed(4);

    document.getElementById("exchangeResult").innerHTML = amountValue + " CHF = " + _conversionResult26 + " USD";
  } else if (selectSource == 5 && selectTarget == 2) {
    var _currency53 = Number(data.response.rates.GBP);

    var _currency1Figures27 = _currency53.toFixed(4);

    var _currency54 = Number(data.response.rates.CHF);

    var _currency2Figures27 = _currency54.toFixed(4);

    var _conversion27 = _currency1Figures27 * 10000 / (_currency2Figures27 * 10000) * (amountValue * 100) / 100;

    var _conversionResult27 = _conversion27.toFixed(4);

    document.getElementById("exchangeResult").innerHTML = amountValue + " CHF = " + _conversionResult27 + " GBP";
  } else if (selectSource == 5 && selectTarget == 3) {
    var _currency55 = Number(data.response.rates.JPY);

    var _currency1Figures28 = _currency55.toFixed(4);

    var _currency56 = Number(data.response.rates.CHF);

    var _currency2Figures28 = _currency56.toFixed(4);

    var _conversion28 = _currency1Figures28 * 10000 / (_currency2Figures28 * 10000) * (amountValue * 100) / 100;

    var _conversionResult28 = _conversion28.toFixed(3);

    document.getElementById("exchangeResult").innerHTML = amountValue + " CHF = " + _conversionResult28 + " JPY";
  } else if (selectSource == 5 && selectTarget == 4) {
    var _currency57 = Number(data.response.rates.CAD);

    var _currency1Figures29 = _currency57.toFixed(4);

    var _currency58 = Number(data.response.rates.CHF);

    var _currency2Figures29 = _currency58.toFixed(4);

    var _conversion29 = _currency1Figures29 * 10000 / (_currency2Figures29 * 10000) * (amountValue * 100) / 100;

    var _conversionResult29 = _conversion29.toFixed(4);

    document.getElementById("exchangeResult").innerHTML = amountValue + " CHF = " + _conversionResult29 + " CAD";
  }
  /* Table data */

  /* Euro row */


  {
    var _currency59 = Number(data.response.rates.USD);

    var _currency1Figures30 = _currency59.toFixed(4);

    var _currency60 = Number(data.response.rates.EUR);

    var _currency2Figures30 = _currency60.toFixed(4);

    var _conversion30 = _currency1Figures30 * 10000 / (_currency2Figures30 * 10000);

    var _conversionResult30 = _conversion30.toFixed(4);

    document.getElementById("eurusd").innerText = _conversionResult30;
  }
  {
    var _currency61 = Number(data.response.rates.GBP);

    var _currency1Figures31 = _currency61.toFixed(4);

    var _currency62 = Number(data.response.rates.EUR);

    var _currency2Figures31 = _currency62.toFixed(4);

    var _conversion31 = _currency1Figures31 * 10000 / (_currency2Figures31 * 10000);

    var _conversionResult31 = _conversion31.toFixed(4);

    document.getElementById("eurgbp").innerText = _conversionResult31;
  }
  {
    var _currency63 = Number(data.response.rates.CHF);

    var _currency1Figures32 = _currency63.toFixed(3);

    var _currency64 = Number(data.response.rates.EUR);

    var _currency2Figures32 = _currency64.toFixed(4);

    var _conversion32 = _currency1Figures32 * 10000 / (_currency2Figures32 * 10000);

    var _conversionResult32 = _conversion32.toFixed(4);

    document.getElementById("eurchf").innerText = _conversionResult32;
  }
  {
    var _currency65 = Number(data.response.rates.JPY);

    var _currency1Figures33 = _currency65.toFixed(4);

    var _currency66 = Number(data.response.rates.EUR);

    var _currency2Figures33 = _currency66.toFixed(4);

    var _conversion33 = _currency1Figures33 * 10000 / (_currency2Figures33 * 10000);

    var _conversionResult33 = _conversion33.toFixed(3);

    document.getElementById("eurjpy").innerText = _conversionResult33;
  }
  {
    var _currency67 = Number(data.response.rates.CAD);

    var _currency1Figures34 = _currency67.toFixed(4);

    var _currency68 = Number(data.response.rates.EUR);

    var _currency2Figures34 = _currency68.toFixed(4);

    var _conversion34 = _currency1Figures34 * 10000 / (_currency2Figures34 * 10000);

    var _conversionResult34 = _conversion34.toFixed(4);

    document.getElementById("eurcad").innerText = _conversionResult34;
  }
  /* Dollar row */

  {
    var _currency69 = Number(data.response.rates.EUR);

    var _currency1Figures35 = _currency69.toFixed(4);

    var _currency70 = Number(data.response.rates.USD);

    var _currency2Figures35 = _currency70.toFixed(4);

    var _conversion35 = _currency1Figures35 * 10000 / (_currency2Figures35 * 10000);

    var _conversionResult35 = _conversion35.toFixed(4);

    document.getElementById("usdeur").innerText = _conversionResult35;
  }
  {
    var _currency71 = Number(data.response.rates.GBP);

    var _currency1Figures36 = _currency71.toFixed(4);

    var _currency72 = Number(data.response.rates.USD);

    var _currency2Figures36 = _currency72.toFixed(4);

    var _conversion36 = _currency1Figures36 * 10000 / (_currency2Figures36 * 10000);

    var _conversionResult36 = _conversion36.toFixed(4);

    document.getElementById("usdgbp").innerText = _conversionResult36;
  }
  {
    var _currency73 = Number(data.response.rates.CHF);

    var _currency1Figures37 = _currency73.toFixed(4);

    var _currency74 = Number(data.response.rates.USD);

    var _currency2Figures37 = _currency74.toFixed(4);

    var _conversion37 = _currency1Figures37 * 10000 / (_currency2Figures37 * 10000);

    var _conversionResult37 = _conversion37.toFixed(4);

    document.getElementById("usdchf").innerText = _conversionResult37;
  }
  {
    var _currency75 = Number(data.response.rates.JPY);

    var _currency1Figures38 = _currency75.toFixed(4);

    var _currency76 = Number(data.response.rates.USD);

    var _currency2Figures38 = _currency76.toFixed(4);

    var _conversion38 = _currency1Figures38 * 10000 / (_currency2Figures38 * 10000);

    var _conversionResult38 = _conversion38.toFixed(3);

    document.getElementById("usdjpy").innerText = _conversionResult38;
  }
  {
    var _currency77 = Number(data.response.rates.CAD);

    var _currency1Figures39 = _currency77.toFixed(4);

    var _currency78 = Number(data.response.rates.USD);

    var _currency2Figures39 = _currency78.toFixed(4);

    var _conversion39 = _currency1Figures39 * 10000 / (_currency2Figures39 * 10000);

    var _conversionResult39 = _conversion39.toFixed(4);

    document.getElementById("usdcad").innerText = _conversionResult39;
  }
  /* Pound Sterling row */

  {
    var _currency79 = Number(data.response.rates.EUR);

    var _currency1Figures40 = _currency79.toFixed(4);

    var _currency80 = Number(data.response.rates.GBP);

    var _currency2Figures40 = _currency80.toFixed(4);

    var _conversion40 = _currency1Figures40 * 10000 / (_currency2Figures40 * 10000);

    var _conversionResult40 = _conversion40.toFixed(4);

    document.getElementById("gbpeur").innerText = _conversionResult40;
  }
  {
    var _currency81 = Number(data.response.rates.USD);

    var _currency1Figures41 = _currency81.toFixed(4);

    var _currency82 = Number(data.response.rates.GBP);

    var _currency2Figures41 = _currency82.toFixed(4);

    var _conversion41 = _currency1Figures41 * 10000 / (_currency2Figures41 * 10000);

    var _conversionResult41 = _conversion41.toFixed(4);

    document.getElementById("gbpusd").innerText = _conversionResult41;
  }
  {
    var _currency83 = Number(data.response.rates.CHF);

    var _currency1Figures42 = _currency83.toFixed(4);

    var _currency84 = Number(data.response.rates.GBP);

    var _currency2Figures42 = _currency84.toFixed(4);

    var _conversion42 = _currency1Figures42 * 10000 / (_currency2Figures42 * 10000);

    var _conversionResult42 = _conversion42.toFixed(4);

    document.getElementById("gbpchf").innerText = _conversionResult42;
  }
  {
    var _currency85 = Number(data.response.rates.JPY);

    var _currency1Figures43 = _currency85.toFixed(4);

    var _currency86 = Number(data.response.rates.GBP);

    var _currency2Figures43 = _currency86.toFixed(4);

    var _conversion43 = _currency1Figures43 * 10000 / (_currency2Figures43 * 10000);

    var _conversionResult43 = _conversion43.toFixed(3);

    document.getElementById("gbpjpy").innerText = _conversionResult43;
  }
  {
    var _currency87 = Number(data.response.rates.CAD);

    var _currency1Figures44 = _currency87.toFixed(4);

    var _currency88 = Number(data.response.rates.GBP);

    var _currency2Figures44 = _currency88.toFixed(4);

    var _conversion44 = _currency1Figures44 * 10000 / (_currency2Figures44 * 10000);

    var _conversionResult44 = _conversion44.toFixed(4);

    document.getElementById("gbpcad").innerText = _conversionResult44;
  }
  /* Swiss Franc row */

  {
    var _currency89 = Number(data.response.rates.EUR);

    var _currency1Figures45 = _currency89.toFixed(4);

    var _currency90 = Number(data.response.rates.CHF);

    var _currency2Figures45 = _currency90.toFixed(4);

    var _conversion45 = _currency1Figures45 * 10000 / (_currency2Figures45 * 10000);

    var _conversionResult45 = _conversion45.toFixed(4);

    document.getElementById("chfeur").innerText = _conversionResult45;
  }
  {
    var _currency91 = Number(data.response.rates.USD);

    var _currency1Figures46 = _currency91.toFixed(4);

    var _currency92 = Number(data.response.rates.CHF);

    var _currency2Figures46 = _currency92.toFixed(4);

    var _conversion46 = _currency1Figures46 * 10000 / (_currency2Figures46 * 10000);

    var _conversionResult46 = _conversion46.toFixed(4);

    document.getElementById("chfusd").innerText = _conversionResult46;
  }
  {
    var _currency93 = Number(data.response.rates.GBP);

    var _currency1Figures47 = _currency93.toFixed(4);

    var _currency94 = Number(data.response.rates.CHF);

    var _currency2Figures47 = _currency94.toFixed(4);

    var _conversion47 = _currency1Figures47 * 10000 / (_currency2Figures47 * 10000);

    var _conversionResult47 = _conversion47.toFixed(4);

    document.getElementById("chfgbp").innerText = _conversionResult47;
  }
  {
    var _currency95 = Number(data.response.rates.JPY);

    var _currency1Figures48 = _currency95.toFixed(4);

    var _currency96 = Number(data.response.rates.CHF);

    var _currency2Figures48 = _currency96.toFixed(4);

    var _conversion48 = _currency1Figures48 * 10000 / (_currency2Figures48 * 10000);

    var _conversionResult48 = _conversion48.toFixed(3);

    document.getElementById("chfjpy").innerText = _conversionResult48;
  }
  {
    var _currency97 = Number(data.response.rates.CAD);

    var _currency1Figures49 = _currency97.toFixed(4);

    var _currency98 = Number(data.response.rates.CHF);

    var _currency2Figures49 = _currency98.toFixed(4);

    var _conversion49 = _currency1Figures49 * 10000 / (_currency2Figures49 * 10000);

    var _conversionResult49 = _conversion49.toFixed(4);

    document.getElementById("chfcad").innerText = _conversionResult49;
  }
  /* Yen row */

  {
    var _currency99 = Number(data.response.rates.EUR);

    var _currency1Figures50 = _currency99.toFixed(4);

    var _currency100 = Number(data.response.rates.JPY);

    var _currency2Figures50 = _currency100.toFixed(4);

    var _conversion50 = _currency1Figures50 * 10000 / (_currency2Figures50 * 10000);

    var _conversionResult50 = _conversion50.toFixed(4);

    document.getElementById("jpyeur").innerText = _conversionResult50;
  }
  {
    var _currency101 = Number(data.response.rates.USD);

    var _currency1Figures51 = _currency101.toFixed(4);

    var _currency102 = Number(data.response.rates.JPY);

    var _currency2Figures51 = _currency102.toFixed(4);

    var _conversion51 = _currency1Figures51 * 10000 / (_currency2Figures51 * 10000);

    var _conversionResult51 = _conversion51.toFixed(4);

    document.getElementById("jpyusd").innerText = _conversionResult51;
  }
  {
    var _currency103 = Number(data.response.rates.GBP);

    var _currency1Figures52 = _currency103.toFixed(4);

    var _currency104 = Number(data.response.rates.JPY);

    var _currency2Figures52 = _currency104.toFixed(4);

    var _conversion52 = _currency1Figures52 * 10000 / (_currency2Figures52 * 10000);

    var _conversionResult52 = _conversion52.toFixed(4);

    document.getElementById("jpygbp").innerText = _conversionResult52;
  }
  {
    var _currency105 = Number(data.response.rates.CHF);

    var _currency1Figures53 = _currency105.toFixed(4);

    var _currency106 = Number(data.response.rates.JPY);

    var _currency2Figures53 = _currency106.toFixed(4);

    var _conversion53 = _currency1Figures53 * 10000 / (_currency2Figures53 * 10000);

    var _conversionResult53 = _conversion53.toFixed(4);

    document.getElementById("jpychf").innerText = _conversionResult53;
  }
  {
    var _currency107 = Number(data.response.rates.CAD);

    var _currency1Figures54 = _currency107.toFixed(4);

    var _currency108 = Number(data.response.rates.JPY);

    var _currency2Figures54 = _currency108.toFixed(4);

    var _conversion54 = _currency1Figures54 * 10000 / (_currency2Figures54 * 10000);

    var _conversionResult54 = _conversion54.toFixed(4);

    document.getElementById("jpycad").innerText = _conversionResult54;
  }
  /* Canadian Dollar row */

  {
    var _currency109 = Number(data.response.rates.EUR);

    var _currency1Figures55 = _currency109.toFixed(4);

    var _currency110 = Number(data.response.rates.CAD);

    var _currency2Figures55 = _currency110.toFixed(4);

    var _conversion55 = _currency1Figures55 * 10000 / (_currency2Figures55 * 10000);

    var _conversionResult55 = _conversion55.toFixed(4);

    document.getElementById("cadeur").innerText = _conversionResult55;
  }
  {
    var _currency111 = Number(data.response.rates.USD);

    var _currency1Figures56 = _currency111.toFixed(4);

    var _currency112 = Number(data.response.rates.CAD);

    var _currency2Figures56 = _currency112.toFixed(4);

    var _conversion56 = _currency1Figures56 * 10000 / (_currency2Figures56 * 10000);

    var _conversionResult56 = _conversion56.toFixed(4);

    document.getElementById("cadusd").innerText = _conversionResult56;
  }
  {
    var _currency113 = Number(data.response.rates.GBP);

    var _currency1Figures57 = _currency113.toFixed(4);

    var _currency114 = Number(data.response.rates.CAD);

    var _currency2Figures57 = _currency114.toFixed(4);

    var _conversion57 = _currency1Figures57 * 10000 / (_currency2Figures57 * 10000);

    var _conversionResult57 = _conversion57.toFixed(4);

    document.getElementById("cadgbp").innerText = _conversionResult57;
  }
  {
    var _currency115 = Number(data.response.rates.CHF);

    var _currency1Figures58 = _currency115.toFixed(4);

    var _currency116 = Number(data.response.rates.CAD);

    var _currency2Figures58 = _currency116.toFixed(4);

    var _conversion58 = _currency1Figures58 * 10000 / (_currency2Figures58 * 10000);

    var _conversionResult58 = _conversion58.toFixed(4);

    document.getElementById("cadchf").innerText = _conversionResult58;
  }
  {
    var _currency117 = Number(data.response.rates.JPY);

    var _currency1Figures59 = _currency117.toFixed(4);

    var _currency118 = Number(data.response.rates.CAD);

    var _currency2Figures59 = _currency118.toFixed(4);

    var _conversion59 = _currency1Figures59 * 10000 / (_currency2Figures59 * 10000);

    var _conversionResult59 = _conversion59.toFixed(3);

    document.getElementById("cadjpy").innerText = _conversionResult59;
  }
}
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52627" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","currenciesData.js"], null)
//# sourceMappingURL=/currenciesData.24f85575.js.map