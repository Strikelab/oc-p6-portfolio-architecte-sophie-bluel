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

//others
let categories;
let works;

//--------------------------------//
//          FUNCTIONS              //
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

//--------------------------------//
//         EVENT LISTENER         //
//--------------------------------//
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
  const buttonsFilter = document.querySelectorAll(".filters-container button");

  // add an event listener for each button
  for (let i = 0; i < buttonsFilter.length; i++) {
    const buttonFilter = document.querySelector(
      `.filters-container button:nth-child(${i + 1})`
    );
    //define action for each filter button
    buttonFilter.addEventListener("click", function () {
      let worksFiltered;

      //deselect and select button to change its style if selected
      let buttonFilterActive = document.querySelector(".btn-filter-selected");
      buttonFilterActive.classList.remove("btn-filter-selected");
      buttonFilter.classList.add("btn-filter-selected");

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
  // add events listener to the form
  //email field
  emailField.addEventListener("input", (e) => {
    let userInput = e.target.value;
    //email format verification
    if (userInput.match(mailFormat)) {
      e.preventDefault();
      divLoginMailMessage.style.color = "green";
      message = '<i class="fa-solid fa-check"></i>';
      emailIsValid = true;
    } else {
      divLoginMailMessage.style.color = "red";
      message = `<p>Veuillez entrer une adresse email valide.</p>`;
    }
    divLoginMailMessage.innerHTML = `${message}`;
  });
  //password field
  passwordField.addEventListener("input", (e) => {
    let userInput = e.target.value;
    // password length verification
    if (userInput.length <= 0) {
      divLoginPasswordMessage.style.color = "red";
      message = "<p>Veuillez saisir un mot de passe</p>";
      divLoginPasswordMessage.innerHTML = message;
    } else {
      passwordIsEmpty = false;
      divLoginPasswordMessage.innerHTML = "";
    }
  });
  //On submit
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    divLoginMessage.innerHTML = "";
    let email = emailField.value;
    let password = passwordField.value;
    if (email === "" || !emailIsValid || password === "" || passwordIsEmpty) {
      divLoginMessage.style.background = "#F8C471 ";
      divLoginMessage.innerHTML =
        "<p>Veuillez compléter tous les champs du formulaire.</p>";
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
            emailField.focus();
            throw "<p>Utilisateur inconnu, veuillez vérifier votre e-mail.</p>";
            //deal with user 401 unauthorized access user exist but password is wrong
          } else if (response.status === 401) {
            passwordField.focus();
            throw "<p>Accès non autorisé, veuillez vérifier votre mot de passe.</p>";
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
          divLoginMessage.style.background = "#F8C471 ";
          divLoginMessage.innerHTML = error;
        });
    }
  });
}

//--------------------------------//
//           TESTS SECTION        //
//--------------------------------//

// console.log(works);
// console.log(categories);

// alternate way to write this API call :
// const worksRequest = await fetch(`${API_URL}${WORKS_PATH}`);
// let works = await worksRequest.json();

// alternate way to write this API call :
// const categoriesRequest = await fetch(`${API_URL}${CATEGORIES_PATH}`);
// let categories = await categoriesRequest.json();

//############################//
//#       fetch login        #//
//############################//
// if (currentPageIsLogin) {
//   let user = {
//     email: "sophie.bluel@test.tld",
//     password: "S0phie",
//   };
//   //define request for fetch
//   let request = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//     body: JSON.stringify(user),
//   };

//   let login = fetch(API_URL + LOGIN_PATH, request)
//     //handle promise
//     .then((response) => {
//       //call to the json method to get body in json format
//       return response.json();
//     })
//     //json() method is also async and return promise so
//     // we need to chain it
//     .then((userDatas) => {
//       //destructuring
//       let { userId, token } = userDatas;
//       console.log("userId: " + userId);
//       console.log("token: " + token);
//     });
// }
//##############################################
//--------------------------------//
//     CONTROLE DE FORMULAIRE     //
//--------------------------------//

// async function makeRequest(url) {
//   await fetch(url).then((response) => {
//     // Shorthand to check for an HTTP 2xx response status.
//     // See https://fetch.spec.whatwg.org/#dom-response-ok
//     if (response.ok) {
//       return response.json();
//     }
//     // Raise an exception to reject the promise and trigger the outer .catch() handler.
//     // By default, an error response status (4xx, 5xx) does NOT cause the promise to reject!
//     throw Error(response.statusText);

//   })
//   .then((json)=>{

//     return json;
//   })
//   .catch(function(error) {
//     console.log('Request failed:', error.message);
//   });
// }
// let montest;
// const test = makeRequest(API_URL + CATEGORIES_PATH,  montest)
// await console.log(test)

// //works list
// const works = await fetch(API_URL + WORKS_PATH)
//   .then((response) => {
//     if (response.ok) {
//       return response.json();
//     }
//     throw Error(response.statusText);
//   })
//   .catch((error) => {
//     console.log(`Une erreur est survenue : ${error.message}`);
//   });
// // categories list
// const categories = await fetch(API_URL + CATEGORIES_PATH)
//   .then((response) => {
//     if (response.ok) {
//       return response.json();
//     }
//     throw Error(response.statusText);
//   })
//   .catch((error) => {
//     console.log(`Une erreur est survenue : ${error.message}`);
//   });
