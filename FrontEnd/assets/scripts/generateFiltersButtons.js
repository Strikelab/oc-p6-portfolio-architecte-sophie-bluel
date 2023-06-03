import { API_URL, CATEGORIES_PATH } from "./env.js";
import callAPI from "./callAPI.js";
/**
 *
 * This function takes an array of object as argument and add elements to DOM.
 * and generate filters buttons
 *
 * @param {array} datas
 *
 */

async function generateFiltersButtons() {
  let categories = await callAPI(API_URL + CATEGORIES_PATH);
  if (categories && categories.length > 0) {
    const divButtonsContainer = document.querySelector(".filters-container");
    // default button for all categories
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
  }
}

export default generateFiltersButtons;
