/**
 * Clapy library!
 */
const clapy = (options = {}) => {
  // Initialize all required values
  let selector = initValue(options, 'selector', '.clapy', 'string');
  let api = initValue(options, 'api', 'https://clapy-dev.now.sh/', 'string');

  // Current count for the clapy elements
  let counts = {};

  // Current path
  let currentUrl =  window.location.href.split('?')[0];

  // Clapy elements in the site
  let els = document.querySelectorAll(selector);

  // Iterate over all the elements to initialize them
  els.forEach((el) => {
    let url = initValue(el.dataset, 'clapyUrl', currentUrl, 'string');

  });

  /**
   * Initialize the given value. This method will try to get the property from the
   * options object. If it's present, it will check the expected type and return it
   * or return the default value
   */
  function initValue(options, property, defaultValue, expected) {
    let current = options[property];
    return (current && typeof current === expected) ? current : defaultValue;
  }

  /**
   * Fetch the data from the server for the given url. It receives a callback that will
   * be executed with the result.
   */
  function fetchData(url, callback) {
    if (counts[url] && counts[url].fetching) {
      // The data is being fetch for that URL
      return;
    }

    fetch(`${api}${url}`)
      .then((response) => {
        // TODO!
      });
  }
}
