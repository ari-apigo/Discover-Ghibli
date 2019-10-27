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
  let filmsjson = [
    {
      "id": "2baf70d1-42bb-4437-b551-e5fed5a87abe",
      "title": "Castle in the Sky",
      "description": "The orphan Sheeta inherited a mysterious crystal that links her to the mythical sky-kingdom of Laputa. With the help of resourceful Pazu and a rollicking band of sky pirates, she makes her way to the ruins of the once-great civilization. Sheeta and Pazu must outwit the evil Muska, who plans to use Laputa's science to make himself ruler of the world.",
      "director": "Hayao Miyazaki",
      "producer": "Isao Takahata",
      "release_date": "1986",
      "rt_score": "95",
      "people": [
        "https://ghibliapi.herokuapp.com/people/"
      ],
      "species": [
        "https://ghibliapi.herokuapp.com/species/af3910a6-429f-4c74-9ad5-dfe1c4aa04f2"
      ],
      "locations": [
        "https://ghibliapi.herokuapp.com/locations/"
      ],
      "vehicles": [
        "https://ghibliapi.herokuapp.com/vehicles/"
      ],
      "url": "https://ghibliapi.herokuapp.com/films/2baf70d1-42bb-4437-b551-e5fed5a87abe"
    },
    {
      "id": "12cfb892-aac0-4c5b-94af-521852e46d6a",
      "title": "Grave of the Fireflies",
      "description": "In the latter part of World War II, a boy and his sister, orphaned when their mother is killed in the firebombing of Tokyo, are left to survive on their own in what remains of civilian life in Japan. The plot follows this boy and his sister as they do their best to survive in the Japanese countryside, battling hunger, prejudice, and pride in their own quiet, personal battle.",
      "director": "Isao Takahata",
      "producer": "Toru Hara",
      "release_date": "1988",
      "rt_score": "97",
      "people": [
        "https://ghibliapi.herokuapp.com/people/"
      ],
      "species": [
        "https://ghibliapi.herokuapp.com/species/af3910a6-429f-4c74-9ad5-dfe1c4aa04f2"
      ],
      "locations": [
        "https://ghibliapi.herokuapp.com/locations/"
      ],
      "vehicles": [
        "https://ghibliapi.herokuapp.com/vehicles/"
      ],
      "url": "https://ghibliapi.herokuapp.com/films/12cfb892-aac0-4c5b-94af-521852e46d6a"
    }
  ];

  window.addEventListener("load", init);

  function init() {
    getFilms();
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
