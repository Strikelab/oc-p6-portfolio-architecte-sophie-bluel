//env variables
import { API_URL } from "./env.js";
import { CATEGORIES_PATH } from "./env.js";
import { WORKS_PATH } from "./env.js";
import { LOGIN_PATH } from "./env.js";
import { loggedIn } from "./env.js";
//functions
import callAPI from "./callAPI.js";
import callModal from "./callModal.js";
import generateFiltersButtons from "./generateFiltersButtons.js";
import generateWorks from "./generateWorks.js";

//--------------------------------//
//    CONSTANTS & VARIABLES       //
//--------------------------------//

//pages
const currentPage = window.location.href;
let currentPageIsIndex = currentPage.includes("index.html");
let currentPageIsLogin = currentPage.includes("login.html");

//login user
let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const primaryColor = "#1D6154";
const secondaryColor = "#B1663C";
const infoColor = "lightblue";
const alertColor = "#F8C471";
const errorColor = "red";
//others
let categories;
let works;
let serverDown = true;

//--------------------------------//
//          API REQUESTS          //
//--------------------------------//

if (currentPageIsIndex) {
  //list of categories
  categories = await callAPI(API_URL + CATEGORIES_PATH);

  //list of works
  works = await callAPI(API_URL + WORKS_PATH);
}

//--------------------------------//
//     DOM ELEMENTS SELECTION     //
//--------------------------------//

// DOM parent select
const myHeader = document.querySelector("header");
const introductionFigure = document.querySelector("#introduction figure");

const sectionPortFolio = document.querySelector("#portfolio");
const portFolioTitle = document.querySelector("#portfolio > h2");
const navLogin = document.querySelector("nav li:nth-child(3) a");
const divLoginMessage = document.querySelector("#login__message");
const divLoginMailMessage = document.querySelector("#login__mail-message");
const divLoginPasswordMessage = document.querySelector(
  "#login__password-message"
);
const loginButton = document.querySelector("#login__button");
const recoveryPassword = document.querySelector("#login a ");

//--------------------------------//
//  FIRST INDEX PAGE GENERATION   //
//--------------------------------//

if (loggedIn) {
  //edition menu
  navLogin.innerText = "logout";
  const divEdition = document.createElement("div");
  divEdition.id = "edition-menu";
  myHeader.parentNode.insertBefore(divEdition, myHeader);
  const editionParagraph = document.createElement("p");
  editionParagraph.innerHTML =
    '<i class="fa-regular fa-pen-to-square"></i>Mode édition';
  const editionButton = document.createElement("button");
  editionButton.innerText = "publier les changements";
  divEdition.appendChild(editionParagraph);
  divEdition.appendChild(editionButton);
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
  generateFiltersButtons(categories);
  //First gallery generation
  generateWorks(works);

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
      generateWorks(worksFiltered);
    });
  }
}

//--------------------------------//
//             LOGIN              //
//--------------------------------//

if (currentPageIsLogin) {
  const loginForm = document.getElementById("login__form");
  const emailField = loginForm.elements["login__email"];
  const passwordField = loginForm.elements["login__password"];

  let email;
  let password;
  let emailIsValid = false;
  let passwordIsEmpty = true;
  let message;
  // add events listener to the form and live information user
  //email field
  emailField.addEventListener("input", (e) => {
    let userInput = e.target.value;
    //email format verification
    if (userInput.match(mailFormat)) {
      // e.preventDefault();
      emailField.style.outlineColor = primaryColor;
      divLoginMailMessage.style.color = primaryColor;

      message = '<i class="fa-solid fa-check"></i>';
      emailIsValid = true;
    } else {
      emailField.style.outlineColor = secondaryColor;
      divLoginMailMessage.style.color = errorColor;
      message = `<p>Veuillez entrer une adresse email valide.</p>`;
      emailIsValid = false;
    }
    divLoginMailMessage.innerHTML = `${message}`;
  });
  //password field fill control
  passwordField.addEventListener("input", (e) => {
    let userInput = e.target.value;
    // password length verification
    if (userInput.length <= 0) {
      divLoginPasswordMessage.style.color = errorColor;
      message = "<p>Veuillez saisir un mot de passe</p>";
      divLoginPasswordMessage.innerHTML = message;
    } else {
      passwordIsEmpty = false;
      divLoginPasswordMessage.innerHTML = "";
    }
  });
  //form submit
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newLocal = (divLoginMessage.innerHTML =
      '<p class="brown">A few moments later...</p><i class="brown fa-solid fa-hourglass-start">');
    divLoginMessage.style.backgroundColor = "transparent";
    let email = emailField.value;
    let password = passwordField.value;
    // submit need a valid email and a password with lenght  > 0
    if (email === "" || !emailIsValid || password === "" || passwordIsEmpty) {
      divLoginMessage.style.background = alertColor;
      emailField.value = "";
      emailField.focus();
      divLoginMessage.innerHTML =
        '<i class="fas fa-triangle-exclamation"></i><p>Veuillez compléter tous les champs du formulaire.</p>';
    } else {
      // body object for API request
      let user = {
        email: `${email}`,
        password: `${password}`,
      };
      //define request for fetch
      let request = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(user),
      };

      //API request
      fetch(API_URL + LOGIN_PATH, request)
        //handle promise
        .then((response) => {
          serverDown = false; //net::R_CONNECTION_REFUSED if true --> .catch()
          if (response.status === 200) {
            //call to the json method to get body in json format
            return response.json();
            //API answer :user 404 not found
          } else if (response.status === 404) {
            emailField.style.outlineColor = errorColor;
            emailField.focus();
            let e = new Error(
              '<i class="fas fa-triangle-exclamation"></i><p>Utilisateur inconnu, veuillez vérifier votre E-mail.</p>'
            );
            throw e;
            //API answer: user 401 unauthorized access user exist but password is wrong
          } else if (response.status === 401) {
            passwordField.style.outlineColor = errorColor;
            passwordField.focus();
            recoveryPassword.innerHTML =
              'Mot de passe oublié <i class="fa-solid fa-unlock"></i>';
            let e = new Error(
              '<i class="fas fa-triangle-exclamation"></i><p>Accès non autorisé, veuillez vérifier votre mot de passe.</p>'
            );
            throw e;
            // 503 service unavailable, API is probably down.
          } else if (response.status === 503) {
            let e = new Error(); //e.message is define in catch()
            e.status = 503;
            throw e;
          } else {
            //deal with other status codes
            serverDown = true;
            let e = new Error(
              '<i class="fas fa-triangle-exclamation"></i>Service Indisponible actuellement , veuillez réessayer ultérieurement;'
            );
            throw e;
          }
        })
        //json() method is also async and return promise so
        // we need to chain it
        .then((userDatas) => {
          //destructuring
          let { userId, token, message } = userDatas;
          if (!message && userId && token) {
            //put userID and token in user's local storage
            window.localStorage.setItem("token", token);
            window.localStorage.setItem("userId", userId);

            //redirection
            window.location.replace("../../index.html");
          }
        })
        .catch((error) => {
          divLoginMessage.style.background = alertColor;
          // server unreachable or service unavailable API is down
          if (serverDown || error.status === 503) {
            divLoginMessage.style.background = infoColor;
            error.message =
              '<i class="rounded fa-solid fa-info"></i><p>Serveur injoignable, veuillez réessayer ultérieurement</p>';
          }
          divLoginMessage.innerHTML = error.message;
        });
    }
  });
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

//--- INTRO
if (loggedIn) {
  // Get the button that opens the modal
  const introButtonModifier =
    introductionFigure.querySelector(".modifier-button");
  // When the user clicks the button, open the modal
  introButtonModifier.addEventListener("click", () => {
    callModal("Coming soon...");
  });
}
//---GaLLERY
if (loggedIn) {
  // Get the button that opens the modal
  const portFolioButtonModifier =
    portFolioTitle.querySelector(".modifier-button");
  // When the user clicks the button, open the modal
  portFolioButtonModifier.addEventListener("click", () => {
    callModal("Galerie photo");
    const modalContentPage1 = document.querySelector(".modal__content__page-1");
    const modalContentPage2 = document.querySelector(".modal__content__page-2");

    const modalContentContainer1 = document.querySelector(
      ".modal__content__container1"
    );
    works.forEach((data) => {
      modalContentContainer1.innerHTML += `<figure>

    <img class = modal__content__picture src=${data.imageUrl} alt =${data.title}>
    <span class = modal__content__move-btn></span>
    <span class = modal__content__trash-btn></span>
    <p class = modal__content__edit-btn>éditer</p>
    </figure>`;
    });
    const modalButtonAjouterPhoto = document.createElement("input");
    modalButtonAjouterPhoto.type = "submit";
    modalButtonAjouterPhoto.classList.add("modal__add-picture-btn");

    modalButtonAjouterPhoto.value = "Ajouter une photo";
    modalContentPage1.appendChild(modalButtonAjouterPhoto);
    const modalSupprimerGallerie = document.createElement("input");
    modalSupprimerGallerie.type = "submit";
    modalSupprimerGallerie.classList.add("modal__remove-gallery-btn");
    modalSupprimerGallerie.value = "Supprimer la galerie";
    modalContentPage1.appendChild(modalSupprimerGallerie);
    //events listeners toogle modal pages
    modalButtonAjouterPhoto.addEventListener("click", () => {
      modalContentPage1.style.transform = "translateX(-110%)";
      modalContentPage2.style.transform = "translateX(0)";
    });
  });
}

//--------------------------------//
//           TESTS SECTION        //
//--------------------------------//
