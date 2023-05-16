//--------------------------------//
//           CONSTANTS            //
//--------------------------------//

//---------environnement-----------//
//---------API server URL----------//

const API_URL = "http://localhost:5678";
const WORKS_PATH = "/api/works/";


//get works ressources from swagger API

const response = await fetch(`${API_URL}${WORKS_PATH}`);
let works = await response.json();
// Transformation des works en JSON

console.log(works);

//--------------------------------//
//      CREATE DOM ELEMENT        //
//--------------------------------//

// DOM parent select
const divGallery = document.querySelector(".gallery");

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






