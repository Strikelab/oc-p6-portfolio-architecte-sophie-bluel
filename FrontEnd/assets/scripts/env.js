//environment
const API_URL = "http://localhost:5678";
const WORKS_PATH = "/api/works/";
const CATEGORIES_PATH = "/api/categories/";
const LOGIN_PATH = "/api/users/login";
//check local storage 
let currentUserId = window.localStorage.getItem("userId");
//if currentUserId exists parse it to integer else set default = 1.
currentUserId ? (currentUserId = parseInt(currentUserId)) : (currentUserId = 1);
const currentToken = window.localStorage.getItem("token");
const loggedIn = currentUserId && currentToken ? true : false;

export {
    API_URL,
    WORKS_PATH,
    CATEGORIES_PATH,
    LOGIN_PATH,
    currentUserId,
    currentToken,
    loggedIn
}