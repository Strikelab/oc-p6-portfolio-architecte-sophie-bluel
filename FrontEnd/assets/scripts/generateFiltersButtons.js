import Api from "./Api.js";
import generatePortFolioGallery from "./generatePortFolioGallery.js";

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
  // get the list of filter buttons
  const filterButtons = document.querySelectorAll(".filters-container button");
  // add an event listener for each button
  for (let i = 0; i < filterButtons.length; i++) {
    const filterButton = document.querySelector(
      `.filters-container button:nth-child(${i + 1})`
    );
    //define action for each filter button
    filterButton.addEventListener("click", async function () {
      let works = await Api.getWorks();
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
      generatePortFolioGallery(worksFiltered);
    });
  }
}

export default generateFiltersButtons;
