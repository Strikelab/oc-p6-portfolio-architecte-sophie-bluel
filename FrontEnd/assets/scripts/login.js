import { API_URL } from "./env.js";
import { LOGIN_PATH } from "./env.js";
let serverDown = true;
let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const primaryColor = "#1D6154";
const secondaryColor = "#B1663C";
const infoColor = "lightblue";
const alertColor = "#F8C471";
const errorColor = "red";
const divLoginMessage = document.querySelector("#login__message");
const divLoginMailMessage = document.querySelector("#login__mail-message");
const divLoginPasswordMessage = document.querySelector(
  "#login__password-message"
);
const recoveryPassword = document.querySelector("#login a ");

function login() {
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
    email = emailField.value;
    password = passwordField.value;
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
            //API answer :user 404 not found or 401 unauthorized because password is wrong
          } else if (response.status === 404 || response.status === 401) {
            emailField.style.outlineColor = errorColor;
            emailField.focus();
            recoveryPassword.innerHTML =
              'Mot de passe oublié <i class="fa-solid fa-unlock"></i>';
            let e = new Error(
              '<i class="fas fa-triangle-exclamation"></i><p>veuiller vérifier votre e-mail ou votre mot de passe.</p>'
            );
            throw e;
          }

          // 503 service unavailable, API is probably down.
          else if (response.status === 503) {
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

export default login;
