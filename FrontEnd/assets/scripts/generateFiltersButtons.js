import Api from "./Api.js";

/**
 *
 * This function ask for categories to API and add filters buttons to DOM
 *
 */

async function generateFiltersButtons() {
  let categories = await Api.getCategories();
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
