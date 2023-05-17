//--------------------------------//
//           ENV CONSTANTS        //
//--------------------------------//

const API_URL = "http://localhost:5678";
const WORKS_PATH = "/api/works/";
const CATEGORIES_PATH = "/api/categories/";

//--------------------------------//
//          API REQUESTS          //
//--------------------------------//

//works

const works = await fetch(`${API_URL}${WORKS_PATH}`).then((works) =>
  works.json()
);
// alternate way to write this API call :
// const worksRequest = await fetch(`${API_URL}${WORKS_PATH}`);
// let works = await worksRequest.json();

//categories
const categories = await fetch(`${API_URL}${CATEGORIES_PATH}`).then(
  (categories) => categories.json()
);
console.log(works);
console.log(categories);

// alternate way to write this API call :
// const categoriesRequest = await fetch(`${API_URL}${CATEGORIES_PATH}`);
// let categories = await categoriesRequest.json();

//--------------------------------//
//          DOM ELEMENTS          //
//--------------------------------//

// DOM parent select
const divGallery = document.querySelector(".gallery");
const divButtonsContainer = document.querySelector(".filters-container");
const divPortFolio = document.querySelector(".portfolio");

//generate buttons
// button "Tous"
const categorieButton = document.createElement("button");
categorieButton.innerText = "Tous";
divButtonsContainer.appendChild(categorieButton);

//categories buttons
for (const categorie of categories) {
  const categorieButton = document.createElement("button");
  categorieButton.innerText = categorie.name;
  divButtonsContainer.appendChild(categorieButton);
}
/**
 * This function takes an array of object as argument and add elements to DOM.
 * @param {array} works
 */
function generateWorks(works) {
  divGallery.innerHTML = "";
  // Add works to DOM
  for (const work of works) {
    // DOM Childs
    const figure = document.createElement("figure");
    const workPicture = document.createElement("img");
    const workFigCaption = document.createElement("figcaption");
    // Childs Attributes
    workPicture.src = work.imageUrl;
    workPicture.setAttribute("alt", `${work.title}`);
    workFigCaption.innerText = `${work.title}`;
    // Add childs to DOM
    divGallery.appendChild(figure);
    figure.appendChild(workPicture);
    figure.appendChild(workFigCaption);
  }
}
//First gallery generation
generateWorks(works);

//--------------------------------//
//             FILTERS            //
//--------------------------------//

// get the list of filter buttons
const buttonsFilter = document.querySelectorAll(".filters-container button");

// add an event listener for each button
for (let i = 0; i < buttonsFilter.length; i++) {
  const buttonFilter = document.querySelector(
    `.filters-container button:nth-child(${i + 1})`
  );
  //define action for each filter button
  buttonFilter.addEventListener("click", function () {
    let worksFiltered;
    //first button must return works in all categories
    if (i === 0) {
      worksFiltered = works;
    }
    //other buttons must return specific works according to categorie
    else {
      worksFiltered = works.filter(function (work) {
        return work.categoryId === i;
      });
    }
    //and finally call function
    generateWorks(worksFiltered);
  });
}
