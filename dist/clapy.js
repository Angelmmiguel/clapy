window["Clapy"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Clapy library!
 */
var Clapy = function Clapy() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  // Initialize all required values
  var selector = initValue(options, 'selector', '.clapy', 'string');
  var api = initValue(options, 'api', 'https://clapy-dev.now.sh/', 'string');

  // Current count for the clapy elements
  var counts = {};

  // Current path
  var currentUrl = window.location.href.split('?')[0];

  // Clapy elements in the site
  var els = document.querySelectorAll(selector);

  // Iterate over all the elements to initialize them
  els.forEach(function (el) {
    var url = initValue(el.dataset, 'clapyUrl', currentUrl, 'string');
    // Init the HTML elements
    initElement(el);
    // Initiate fetch :)
    fetchData(url);
  });

  /**
   * Initialize the given value. This method will try to get the property from the
   * options object. If it's present, it will check the expected type and return it
   * or return the default value
   */
  function initValue(options, property, defaultValue, expected) {
    var current = options[property];
    return current && (typeof current === 'undefined' ? 'undefined' : _typeof(current)) === expected ? current : defaultValue;
  }

  /**
   * Initialize the HTML code of the element
   */
  function initElement(el) {
    var button = document.createElement('button');
    button.classList.add('clapy__button');
    var counter = document.createElement('div');
    counter.classList.add('clapy__counter');
    counter.appendChild(document.createTextNode('-'));
    el.appendChild(button);
    el.appendChild(counter);
  }

  /**
   * Update the elements in the page with the new data from the API
   */
  function updateElements(url) {
    els.forEach(function (el) {
      var elUrl = initValue(el.dataset, 'clapyUrl', currentUrl, 'string');
      if (url === elUrl) {
        el.querySelector('.clapy__counter').innerHTML = counts[url].count;
      }
    });
  }

  /**
   * Fetch the data from the server for the given url. It receives a callback that will
   * be executed with the result.
   */
  function fetchData(url) {
    if (counts[url] && counts[url].fetching) {
      // The data is being fetch for that URL
      return;
    }

    // Store the data in the counts
    counts[url] = counts[url] || { count: 0, fetching: false };
    counts[url].fetching = true;

    fetch('' + api + url).then(function (response) {
      return response.json();
    }).then(function (json) {
      // Update the object and the UI
      console.log(json);
      counts[url].count = json.count;
      counts[url].fetching = false;
      updateElements(url);
    }).catch(function (err) {
      // Error :(
      console.log(err);
    });
  }
};

// Export the function
module.exports = Clapy;

/***/ })
/******/ ]);