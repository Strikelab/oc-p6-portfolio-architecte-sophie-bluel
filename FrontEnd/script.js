//--------------------------------//
//    CONSTANTS & VARIABLES       //
//--------------------------------//

//environment
const API_URL = "http://localhost:5678";
const WORKS_PATH = "/api/works/";
const CATEGORIES_PATH = "/api/categories/";
const LOGIN_PATH = "/api/users/login";

//pages
const currentPage = window.location.href;
let currentPageIsIndex = currentPage.includes("index.html");
let currentPageIsLogin = currentPage.includes("login.html");

//login user
let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const currentUserId = window.localStorage.getItem("userId");
const currentToken = window.localStorage.getItem("token");
const loggedIn = currentUserId && currentToken ? true : false;
const loggedOut = !loggedIn;
const primaryColor = "#1D6154";
const secondaryColor = "#B1663C";
const alertColor = "#F8C471";
const errorColor = "red";
//others
let categories;
let works;

//--------------------------------//
//          FUNCTIONS             //
//--------------------------------//

/**
 *
 * This function takes an url as argument
 * it makes API call and return a promise if no error occured
 * it throw and catch errors if needed
 * example :
 * cont myConstant = await callAPI(http://myurl.tld)
 * myConstant will be an array of objetcs in JSON format
 *
 * @param {url} works
 *
 */

async function callAPI(url) {
  return fetch(url)
    .then((response) => {
      //shorthand for status != 200
      if (response.ok) {
        return response.json();
      }
      throw Error(response.statusText);
    })
    .catch((error) => {
      console.log(`Une erreur est survenue : ${error.message}`);
    });
}

/**
 *
 * This function takes an array of object as argument and add elements to DOM.
 * and generate filters buttons
 *
 * @param {array} datas
 *
 */
function generateFiltersButtons(datas) {
  if (categories) {
    // default button for all categories
    const categorieButton = document.createElement("button");
    categorieButton.innerText = "Tous";
    divButtonsContainer.appendChild(categorieButton);

    //categories buttons
    for (const data of datas) {
      const categorieButton = document.createElement("button");
      categorieButton.innerText = data.name;
      divButtonsContainer.appendChild(categorieButton);
    }
    let buttonFilterActive = document.querySelector(
      ".filters-container button:nth-child(1)"
    );
    buttonFilterActive.setAttribute("class", "btn-filter-selected");
  }
}

/**
 *
 * This function takes an array of object as argument.
 * It add elements to DOM, and generate portfolio gallery
 *
 * @param {array} datas
 *
 */

function generateWorks(datas) {
  if (works) {
    divGallery.innerHTML = "";
    // Add works to DOM
    for (const data of datas) {
      // DOM Childs
      const figure = document.createElement("figure");
      const workPicture = document.createElement("img");
      const workFigCaption = document.createElement("figcaption");
      // Childs Attributes
      workPicture.src = data.imageUrl;
      workPicture.setAttribute("alt", `${data.title}`);
      workFigCaption.innerText = `${data.title}`;
      // Add childs to DOM
      divGallery.appendChild(figure);
      figure.appendChild(workPicture);
      figure.appendChild(workFigCaption);
    }
  }
}
//--------------------------------//
//          API REQUESTS          //
//--------------------------------//

if (currentPageIsIndex) {
  categories = await callAPI(API_URL + CATEGORIES_PATH);
  works = await callAPI(API_URL + WORKS_PATH);
}

//--------------------------------//
//     DOM ELEMENTS SELECTION     //
//--------------------------------//

// DOM parent select
const myHeader = document.querySelector("header");
const divGallery = document.querySelector(".gallery");
const divButtonsContainer = document.querySelector(".filters-container");
const sectionPortFolio = document.querySelector("#portfolio");
const navLogin = document.querySelector("nav li:nth-child(3) a");
const divLoginMessage = document.querySelector("#login__message");
const divLoginMailMessage = document.querySelector("#login__mail-message");
const divLoginPasswordMessage = document.querySelector(
  "#login__password-message"
);
const loginButton = document.querySelector("#login__button");
const recoveryPassword = document.querySelector("#login a ");
console.log(recoveryPassword);
//--------------------------------//
//         EVENT LISTENER         //
//--------------------------------//
// clear local storage on exit
navLogin.addEventListener("click", (e) => {
  if (loggedIn) {
    e.preventDefault();
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("token");
    window.location.href = "./index.html";
  }
});

//--------------------------------//
// FIRST INDEX PAGE GENERATION    //
//--------------------------------//

//edition menu
if (loggedIn) {
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
    divLoginMessage.innerHTML = "";
    let email = emailField.value;
    let password = passwordField.value;
    // submit need a valid email and a password with lenght  > 0
    if (email === "" || !emailIsValid || password === "" || passwordIsEmpty) {
      divLoginMessage.style.background = alertColor;
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
          if (response.status === 200) {
            //call to the json method to get body in json format
            return response.json();
            //deal with user 404 not found
          } else if (response.status === 404) {
            emailField.style.outlineColor = errorColor;
            emailField.focus();
            throw '<i class="fas fa-triangle-exclamation"></i><p>Utilisateur inconnu, veuillez vérifier votre E-mail.</p>';
            //deal with user 401 unauthorized access user exist but password is wrong
          } else if (response.status === 401) {
            passwordField.style.outlineColor = errorColor;
            passwordField.focus();
            recoveryPassword.innerHTML =
              'Mot de passe oublié <i class="fa-solid fa-unlock"></i>';
            throw '<i class="fas fa-triangle-exclamation"></i><p>Accès non autorisé, veuillez vérifier votre mot de passe.</p>';
          } else {
            //deal with other status codes
            throw new Error(
              "Ooops ! une erreur est survenue, veuillez réessayer."
            );
          }
        })
        //json() method is also async and return promise so
        // we need to chain it
        .then((userDatas) => {
          //destructuring
          let { userId, token, message, error } = userDatas;
          if (!message && userId && token) {
            //put userID and token in user's local storage
            window.localStorage.setItem("token", token);
            window.localStorage.setItem("userId", userId);

            //redirection
            window.location.replace("../index.html");
          }
        })
        .catch((error) => {
          divLoginMessage.style.background = alertColor;
          divLoginMessage.innerHTML = error;
        });
    }
  });
}

//--------------------------------//
//           TESTS SECTION        //
//--------------------------------//
