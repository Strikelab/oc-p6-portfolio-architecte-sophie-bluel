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
const worksRequest = await fetch(`${API_URL}${WORKS_PATH}`);
let works = await worksRequest.json();

//categories
const categoriesRequest = await fetch(`${API_URL}${CATEGORIES_PATH}`);
let categories = await categoriesRequest.json();

//--------------------------------//
//          DOM ELEMENTS          //
//--------------------------------//

// DOM parent select
const divGallery = document.querySelector(".gallery");
const divButtonsContainer = document.querySelector(".filters-container")
const divPortFolio = document.querySelector(".portfolio");

//generate buttons
// button "Tous"
const categorieButton = document.createElement("button");
categorieButton.innerText = "Tous";
divButtonsContainer.appendChild(categorieButton);

//categories buttons
for (const categorie of categories){
    const categorieButton = document.createElement("button");
    categorieButton.innerText = categorie.name;
    divButtonsContainer.appendChild(categorieButton);
}

// Add works to DOM
for(const work of works){
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
};






