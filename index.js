/*
 *  Name: Ariane Apigo
 *  Date: 2019 October 26
 *  Section: AA / Chao Hsu Lin & Austin Jenchi
 *
 *  This is the index.js file for my Discover Ghibli page. It fetches information from the
 *  Studio Ghibli API (https://ghibliapi.herokuapp.com) and manipulates the DOM to display
 *  this information on the page.
 */

"use strict";
(function() {
  const BASE_URL = "https://ghibliapi.herokuapp.com/";

  window.addEventListener("load", init);

  /**
   * Loads the film data from the API onto the page.
   */
  function init() {
    getFilms();
  }

  /**
   * Fetches the film data from the API.
   */
  function getFilms() {
    let url = BASE_URL + "films";
    fetch(url)
      .then(checkStatus)
      .then(resp => resp.json())
      .then(processFilms)
      .catch(handleError);
  }

  /**
   * Checks status of the request to the API.
   * @param {Response} response - result of fetching from the API
   * @return {Response} response - returned when successfully connects request to API
   */
  function checkStatus(response) {
    if (!response.ok) {
      throw Error("Error in request: " + response.statusText);
    }
    return response;
  }

  /**
   * Shows alert with error details when API request fails.
   * @param {Response} error - details regarding reason for failed API request
   */
  function handleError(error) {
    let display = document.getElementById("display");
    let alert = document.createElement("p");
    alert.textContent = "Woops! Guess that's gonna stay undiscovered... " + error;
    alert.classList.add("alert");
    display.appendChild(alert);
  }

  /**
   * Processes and formats API data for display on the page.
   * @param {Response} responseData - data from API
   */
  function processFilms(responseData) {
    let display = document.getElementById("display");
    for (let i = 0; i < responseData.length; i++) {
      let newFilm = document.createElement("article");
      let container = document.createElement("div");
      let title = document.createElement("h3");
      title.textContent = responseData[i].title + " (" + responseData[i]["release_date"] + ")";
      container.appendChild(title);
      let description = document.createElement("p");
      description.textContent = responseData[i].description;
      container.appendChild(description);
      let poster = document.createElement("img");
      poster.classList.add("poster");
      poster.src = getFilmPoster(responseData[i].title);
      poster.alt = responseData[i].title;
      newFilm.appendChild(container);
      newFilm.appendChild(poster);
      display.appendChild(newFilm);
    }
  }

  /**
   * Contracts film title from API data to match image file names.
   * @param {string} title - film title from API data
   * @return {string} - image file path
   */
  function getFilmPoster(title) {
    /*
     * The following site was consulted:
     * https://stackoverflow.com/questions/5963182/how-to-remove-spaces-from-a-string-using-javascript
     */
    title = title.replace(/\s+/g, "");
    return "img/" + title + ".jpg";
  }

})();
