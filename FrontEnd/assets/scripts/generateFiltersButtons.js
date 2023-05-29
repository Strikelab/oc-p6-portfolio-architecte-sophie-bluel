/**
 *
 * This function takes an array of object as argument and add elements to DOM.
 * and generate filters buttons
 *
 * @param {array} datas
 *
 */

function generateFiltersButtons(datas) {
  if (datas && datas.length > 0) {
    const divButtonsContainer = document.querySelector(".filters-container");
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

export default generateFiltersButtons;
