// const DogClass = require("./dogs");

let jsonData;
let initDog;
let letterQue = [];

fetch("https://dog.ceo/api/breeds/list/all")
  .then(response => response.json())
  .then(data => {
    let breedLinks = [];

    let arrayHolder = Object.keys(data.message);

    arrayHolder.forEach(breed => {
      if (data.message[`${breed}`].length === 0) {
        breedLinks.push(breed);
      } else {
        breedLinks.push(breed);
        data.message[`${breed}`].forEach(subBreed => {
          breedLinks.push(`${subBreed} ${breed}`);
        });
      }
    });

    jsonData = breedLinks;
    initDog = new Dogs(breedLinks);
    /* breedLinks.forEach(breedLink => {
      if (breedLink.indexOf(" ") >= 0) {
        let newLink = breedLink.split(" ");
        newLink.reverse();
        let newBreedLink = newLink.join("/");
        document.getElementById(
          "container"
        ).innerHTML += `<li class="breedLink" onclick="getBreedImages(event)" value="${newBreedLink}">${breedLink}</li>`;
      } else {
        document.getElementById(
          "container"
        ).innerHTML += `<li class="breedLink" onclick="getBreedImages(event)" value="${breedLink}">${breedLink}</li>`;
      }
    }); */
  });

let breeds;
setTimeout(() => {
  breeds = jsonData;
  /* console.log(breeds);
  initDog.linkOutput();
  console.log("\n-----------------------\n");
  initDog.alphabetFilter(["a", "b"]);
  console.log(initDog.filteredBreeds);
  console.log("\n-----------------------\n");
  console.log(initDog.linkArray);
  console.log("\n-----------------------\n");
  initDog.resetFilter();
  console.log(initDog.linkArray); */
}, 1000);

function letterSelect(event, letter) {
  // event.target.getAttribute("value")
  if (letterQue.indexOf(letter) === -1) {
    event.style.backgroundColor = "blue";
    event.style.color = "white";
    letterQue.push(letter);
    console.log(letterQue);
    initDog.alphabetFilter(letterQue);
    initDog.linkOutput();
  } else {
    event.style.backgroundColor = "rgb(173, 250, 173)";
    event.style.color = "black";
    let index = letterQue.indexOf(letter);
    letterQue.splice(index, 1);
    console.log(letterQue);
    initDog.alphabetFilter(letterQue);
    initDog.linkOutput();
  }
}

function outputFilter() {
  initDog.alphabetFilter(letterQue);
  initDog.linkOutput();
}

/* function makeListItem(element, item, itemLink, event) {
  document.getElementById(
    element
  ).innerHTML += `<li class="${element}Item" onclick="${event}" value="${itemLink}">${item}</li>`;
}
 */

function getImages(e) {
  if (e.target.getAttribute("value") === null) {
    document.getElementById("imageContainer").innerHTML = "";
  } else {
    document.getElementById("imageContainer").innerHTML = "";
    console.log(e.target.getAttribute("value"), "\n-----------------");
    fetch(`https://dog.ceo/api/breed/${e.target.getAttribute("value")}/images`)
      .then(response => response.json())
      .then(data => {
        return data.message;
      })
      .then(breedImages => {
        breedImages.forEach(img => {
          document.getElementById(
            "imageContainer"
          ).innerHTML += `<li class="breedImage" onclick="" style="background-image: url(${img})" />`;
        });
      });
  }
}

/* function sortByLetter(e) {
  document.getElementById("container").innerHTML = "";
  if (e === "all") {
    breeds.forEach(breedLink => {
      if (breedLink.indexOf(" ") >= 0) {
        let newLink = breedLink.split(" ");
        newLink.reverse();
        let newBreedLink = newLink.join("/");
        document.getElementById(
          "container"
        ).innerHTML += `<li class="breedLink" onclick="getBreedImages(event)" value="${newBreedLink}">${breedLink}</li>`;
      } else {
        document.getElementById(
          "container"
        ).innerHTML += `<li class="breedLink" onclick="getBreedImages(event)" value="${breedLink}">${breedLink}</li>`;
      }
    });
  } else {
    let filteredBreeds = breeds.filter(breed => breed.indexOf(e) === 0);
    console.log(filteredBreeds);
    filteredBreeds.forEach(breedLink => {
      if (breedLink.indexOf(" ") >= 0) {
        let newLink = breedLink.split(" ");
        newLink.reverse();
        let newBreedLink = newLink.join("/");
        document.getElementById(
          "container"
        ).innerHTML += `<li class="breedLink" onclick="getBreedImages(event)" value="${newBreedLink}">${breedLink}</li>`;
      } else {
        document.getElementById(
          "container"
        ).innerHTML += `<li class="breedLink" onclick="getBreedImages(event)" value="${breedLink}">${breedLink}</li>`;
      }
    });
  }
} */
