//env variables
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
const navLogin = document.querySelector("nav li:nth-child(3) a");

//--------------------------------//
//  FIRST INDEX PAGE GENERATION   //
//--------------------------------//

if (loggedIn) {
  //edition menu
  navLogin.innerText = "logout";
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
} else {
  navLogin.innerText = "login";
}

if (currentPageIsIndex) {
  //First Filters buttons generation
  generateFiltersButtons();

  //First gallery generation
  generatePortFolioGallery();

  //--------------------------------//
  //             FILTERS            //
  //--------------------------------//

  // get the list of filter buttons
  const filterButtons = document.querySelectorAll(".filters-container button");

  // add an event listener for each button
  for (let i = 0; i < filterButtons.length; i++) {
    const filterButton = document.querySelector(
      `.filters-container button:nth-child(${i + 1})`
    );
    //define action for each filter button
    filterButton.addEventListener("click", function () {
      let worksFiltered;

      //deselect and select button to change its style if selected
      let filterButtonActive = document.querySelector(".btn-filter-selected");
      filterButtonActive.classList.remove("btn-filter-selected");
      filterButton.classList.add("btn-filter-selected");

      //first button must return works in all categories
      if (i === 0) {
        worksFiltered = works;
      }
      //other buttons must return specific works according to categorie
      else {
        worksFiltered = works.filter(function (work) {
          return work.categoryId === i;
        });
        // worksFiltered = works.filter(({ categoryId }) => categoryId === i);
      }
      //and finally refresh gallery by calling function.
      generatePortFolioGallery(worksFiltered);
    });
  }
}

//--------------------------------//
//             LOGIN              //
//--------------------------------//

if (currentPageIsLogin) {
  login();
}

//log the user out and clean local storage

navLogin.addEventListener("click", (e) => {
  if (loggedIn) {
    e.preventDefault();
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("token");
    window.location.href = "./index.html";
  }
});

//--------------------------------//
//          CALL MODALE           //
//--------------------------------//

if (loggedIn) {
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
}

//--------------------------------//
//           TESTS SECTION        //
//--------------------------------//
