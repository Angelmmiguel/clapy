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
    let current = options[property];
    return (current && typeof current === expected) ? current : defaultValue;
  }

  /**
   * Initialize the HTML code of the element
   */
  function initElement(el) {

  }

  /**
   * Update the elements in the page with the new data from the API
   */
  function updateElements() {
    els.forEach((el) => {
      let url = initValue(el.dataset, 'clapyUrl', currentUrl, 'string');
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

    fetch(`${api}${url}`)
      .then((response) => {
        return response.json();
      }).then((json) => {
        // Update the object and the UI
        counts[url].count = json.count;
        counts[url].fetching = false;
        updateElements();
      }).catch((err) => {
        // Error :(
        console.log(err);
      });
  }
}