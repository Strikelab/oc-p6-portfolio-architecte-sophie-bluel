//--------------------------------//
//            CONSTANTS           //
//--------------------------------//

//environment
const API_URL = "http://localhost:5678";
const WORKS_PATH = "/api/works/";
const CATEGORIES_PATH = "/api/categories/";
const LOGIN_PATH = "/api/users/login";

//others
const currentPage = window.location.href;
let currentPageIsIndex = currentPage.includes("index.html");
let currentPageIsLogin = currentPage.includes("login.html");
const currentUserId = window.localStorage.getItem("userId");
const currentToken = window.localStorage.getItem("token");
// console.log(currentUserId);
// console.log(currentToken);
const loggedIn = (currentUserId && currentToken)?true:false;
const loggedOut = !loggedIn;
// console.log("connecté : " + loggedIn);
// console.log("déconnecté : " + loggedOut);

//how reverse a 
//let userDatas;
//--------------------------------//
//          API REQUESTS          //
//--------------------------------//

//works list

const works = await fetch(`${API_URL}${WORKS_PATH}`).then((works) =>
  works.json()
);

//categories list
const categories = await fetch(`${API_URL}${CATEGORIES_PATH}`).then(
  (categories) => categories.json()
);

//--------------------------------//
//          FUNCTION              //
//--------------------------------//

/**
 *
 * This function takes an array of object as argument and add elements to DOM.
 * and generate portfolio gallery
 *
 * @param {array} works
 *
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

//--------------------------------//
//     DOM ELEMENTS SELECTION     //
//--------------------------------//

// DOM parent select
const divGallery = document.querySelector(".gallery");
const divButtonsContainer = document.querySelector(".filters-container");
const sectionPortFolio = document.querySelector("#portfolio");
const navLogin = document.querySelector("nav li:nth-child(3) a");


//--------------------------------//
// FIRST INDEX PAGE GENERATION    //
//--------------------------------//
if(loggedIn){
  navLogin.innerText = "logout";
}
if (currentPageIsIndex) {
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
  let buttonFilterActive = document.querySelector(
    ".filters-container button:nth-child(1)"
  );
  buttonFilterActive.setAttribute("class", "btn-filter-selected");

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

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let email = emailField.value;
    let password = passwordField.value;
    console.log(
      `
    email :  ${email}
    password : ${password}
    `
    );
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

    fetch(API_URL + LOGIN_PATH, request)
      //handle promise
      .then((response) => {
        //call to the json method to get body in json format
        return response.json();
      })
      //json() method is also async and return promise so
      // we need to chain it
      .then((userDatas) => {
        //destructuring
        let { userId, token } = userDatas;
        console.log("userId: " + userId);
        console.log("token: " + token);
        //put userID and token in user's local storage
        window.localStorage.setItem("token", token);
        window.localStorage.setItem("userId", userId);

        //redirection
        window.location.replace("../index.html");
      });
  });
};

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
