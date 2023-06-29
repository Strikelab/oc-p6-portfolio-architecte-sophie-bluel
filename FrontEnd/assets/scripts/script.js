//variables
import { loggedIn } from "./env.js";
//functions
import callModal from "./callModal.js";
import generateFiltersButtons from "./generateFiltersButtons.js";
import generatePortFolioGallery from "./generatePortFolioGallery.js";
import login from "./login.js";

//--------------------------------//
//    CONSTANTS & VARIABLES       //
//--------------------------------//

//pages
const currentPage = window.location.href;
let currentPageIsIndex = currentPage.includes("index.html");
let currentPageIsLogin = currentPage.includes("login.html");

//--------------------------------//
//     DOM ELEMENTS SELECTION     //
//--------------------------------//

// DOM parent select
const myHeader = document.querySelector("header");
const introductionFigure = document.querySelector("#introduction figure");
const portFolioTitle = document.querySelector("#portfolio > h2");
const navloginButton = document.querySelector("nav li:nth-child(3) a");

//--------------------------------//
//  FIRST INDEX PAGE GENERATION   //
//--------------------------------//
if (currentPageIsIndex) {
  //First Filters buttons generation
  if(!loggedIn){
    generateFiltersButtons();
  }
  //First gallery generation
  generatePortFolioGallery();
} else if (currentPageIsLogin) {
  login();
}

if (loggedIn) {
  //--------------------------------//
  //   LOGGED IN HEADER & BUTTONS   //
  //--------------------------------//

  navloginButton.innerText = "logout";
  const editionHeader = document.createElement("div");
  editionHeader.id = "edition-menu";
  myHeader.parentNode.insertBefore(editionHeader, myHeader);
  const editionParagraph = document.createElement("p");
  editionParagraph.innerHTML =
    '<i class="fa-regular fa-pen-to-square"></i>Mode édition';
  const editionButton = document.createElement("button");
  editionButton.innerText = "publier les changements";
  editionHeader.appendChild(editionParagraph);
  editionHeader.appendChild(editionButton);
  //buttons modifier
  const buttonModifier = '<span class = "modifier-button">modifier</span>';
  //button "modifier introduction"
  introductionFigure.innerHTML += buttonModifier;
  //button "modifier portFolio"
  portFolioTitle.innerHTML += buttonModifier;

  //--------------------------------//
  //   ADD EVENTS TO CALL MODALE    //
  //--------------------------------//

  // Get the buttons that opens the modal
  const introButtonModifier =
    introductionFigure.querySelector(".modifier-button");
  const portFolioButtonModifier =
    portFolioTitle.querySelector(".modifier-button");
  //listeners on click
  window.addEventListener("click", (e) => {
    //intro Modification
    if (e.target == introButtonModifier) {
      alert("not implented yet!");
    }
    //portFolio Modification
    if (e.target == portFolioButtonModifier) {
      callModal();
    }
  });
  //--------------------------------//
  //          LOG OUT               //
  //--------------------------------//
  //log the user out and clean local storage

  navloginButton.addEventListener("click", (e) => {
    e.preventDefault();
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("token");
    window.location.href = "./index.html";
  });
} else {
  navloginButton.innerText = "login";
}

//--------------------------------//
//           TESTS SECTION        //
//--------------------------------//
