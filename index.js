/*
 *  Name: Ariane Apigo
 *  Date: 2019 October 26
 *  Section: AA / Chao Hsu Lin & Austin Jenchi
 *
 *  This is the index.js file for my
 */

"use strict";
(function() {
  const BASE_URL = "https://ghibliapi.herokuapp.com/";

  window.addEventListener("load", init);

  function init() {
    getFilms();
    document.getElementById("ghibliCategories").addEventListener("change", updateDisplay);
  }

  function updateDisplay() {
    if (this.value === "films") {
      getFilms();
    } else if (this.value === "people") {
      
    }
  }

  function getFilms() {
    let url = BASE_URL + "films";
    fetch(url)
    .then(checkStatus)
    .then(resp => resp.json())
    .then(processFilmDisplays)
    .catch(handleError);
  }

  function checkStatus(response) {
    if (!response.ok) {
      throw Error("Error in request: " + response.statusText);
    }
    return response;
  }

  function processFilmDisplays(responseData) {
    let filmsDiv = document.getElementById("films");
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
      newFilm.appendChild(container)
      newFilm.appendChild(poster);
      filmsDiv.appendChild(newFilm);
    }
  }

  function getFilmPoster(title) {
    /* The following site was consulted:
     * https://stackoverflow.com/questions/5963182/how-to-remove-spaces-from-a-string-using-javascript
     */
    title = title.replace(/\s+/g, "");
    return "img/" + title + ".jpg";
  }

  function handleError(error) {
    alert("Woops! Guess that's gonna stay undiscovered... " + error);
  }

})();
