class Dogs {
  constructor(breedArray) {
    this.breedArray = breedArray;
    this.filteredBreeds;
    this.asyncPictures = [];
    this.linkArray = breedArray.map(breed => {
      if (breed.indexOf(" ") >= 0) {
        let link = breed.split(" ");
        link.reverse();
        let newLink = link.join("/");
        return `<li class="breedLink" onclick="getImages(event)" value="${newLink}">${breed}</li>`;
      } else {
        return `<li class="breedLink" onclick="getImages(event)" value="${breed}">${breed}</li>`;
      }
    });
    this.holdImages = this.holdImages.bind(this);
    this.resetFilter = this.resetFilter.bind(this);
    this.alphabetFilter = this.alphabetFilter.bind(this);
    this.linkCreator = this.linkCreator.bind(this);
  }

  resetFilter() {
    this.linkCreator(this.breedArray);
  }

  alphabetFilter(letter) {
    let filteredBreeds = [];
    let completeFilteredBreeds = [];
    if (Array.isArray(letter)) {
      letter.forEach(char => {
        filteredBreeds.push(
          this.breedArray.filter(breed => breed.indexOf(char) === 0)
        );
      });

      filteredBreeds.map(filteredBreedArray =>
        filteredBreedArray.map(filteredBreed => {
          completeFilteredBreeds.push(filteredBreed);
        })
      );
      this.filteredBreeds = completeFilteredBreeds;
      this.linkCreator(completeFilteredBreeds);
    } else {
      let filteredBreeds = this.breedArray.filter(
        breed => breed.indexOf(letter) === 0
      );
      this.filteredBreeds = filteredBreeds;
      this.linkCreator(filteredBreeds);
    }
  }

  linkCreator(array) {
    this.linkArray = array.map(breed => {
      if (breed.indexOf(" ") >= 0) {
        let link = breed.split(" ");
        link.reverse();
        let newLink = link.join("/");
        return `<li class="breedLink" onclick="initDog.holdImages(event)" value="${newLink}">${breed}</li>`;
      } else {
        return `<li class="breedLink" onclick="initDog.holdImages(event)" value="${breed}">${breed}</li>`;
      }
    });
  }

  holdImages(e) {
    fetch(
      `https://dog.ceo/api/breed/${e.target.getAttribute(
        "value"
      )}/images/random/5`
    )
      .then(response => response.json())
      .then(data => {
        return data.message;
      })
      .then(breedImages => {
        breedImages.forEach(img => {
          this.asyncPictures.push(
            `<li class="breedImage" onclick="" style="background-image: url(${img})" />`
          );
        });
      });
    console.log(this.asyncPictures);
  }

  linkOutput() {
    document.getElementById("container").innerHTML = this.linkArray.join("");
  }
}

/* let roof = new Dogs(["yellow", "red", "blue green", "blue", "yellow blue"]);

roof.alphabetFilter(["y"]);

console.log(roof.filteredBreeds);
console.log("\n-----------------------\n");
console.log(roof.linkArray);
console.log("\n-----------------------\n");
roof.resetFilter();
console.log(roof.linkArray);
*/
