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


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; // Import styles!


__webpack_require__(1);

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

  // Clapy timeout
  var clapyTimeout = undefined;

  // Iterate over all the elements to initialize them
  els.forEach(function (el) {
    var url = initValue(el.dataset, 'clapyUrl', currentUrl, 'string');
    // Init the HTML elements
    initElement(el);
    // Load listeners
    addListeners(el);
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
   * Create the listeners
   */
  function addListeners(el) {
    el.querySelector('.clapy__button').addEventListener('click', onClap);
  }

  /**
   * Clean the listeners
   */
  function cleanListeners() {
    els.forEach(function (el) {
      el.querySelector('.clapy__button').removeEventListener('click', onClap);
    });
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
   * Send the query to the server
   */
  function onClap(e) {
    // Prevent other behaviours
    e.preventDefault();
    var el = e.target.parentNode;
    var url = initValue(el.dataset, 'clapyUrl', currentUrl, 'string');

    // Clap node
    var clap = document.createElement('div');
    clap.classList.add('clapy__clap');
    clap.appendChild(document.createTextNode('+1'));
    el.querySelector('.clapy__counter').classList.remove('fadeIn');
    el.appendChild(clap);

    // Add clapping class
    el.classList.add('clapy--clapping');
    clearClapyTimeout(el);

    // Optimistic update ;)
    counts[url].count = counts[url].count + 1;
    updateElements(url);

    fetch('' + api + url, { method: 'POST' }).then(function (response) {
      return response.json();
    }).then(function (json) {
      // Update the object and the UI
      if (!json.clap) {
        counts[url].count = json.count;
        updateElements(url);
      }
    }).catch(function (err) {
      // Error :(
      console.log(err);
    });
  }

  /**
   * Remove the clapy class and elements!
   */
  function clearClapyTimeout(el) {
    // Clear previous timeouts
    clearTimeout(clapyTimeout);

    clapyTimeout = setTimeout(function () {
      el.querySelectorAll('.clapy__clap').forEach(function (clap) {
        clap.remove();
      });
      el.querySelector('.clapy__counter').classList.add('fadeIn');
      el.classList.remove('clapy--clapping');
    }, 1000);
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

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);