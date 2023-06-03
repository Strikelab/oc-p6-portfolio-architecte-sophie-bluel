import updateImageDisplay from "./previewUpdate.js";
import generateModalGallery from "./generateModalGallery.js";
import { API_URL, CATEGORIES_PATH } from "./env.js";
import callAPI from "./callAPI.js";
/**
 *
 * This function generate a modal box
 * it takes categories object and works object as parameters
 * @param {array} categories
 * @param {array} works
 *
 */

async function callModal() {
  let categories = await callAPI(API_URL + CATEGORIES_PATH);
  // works = await callAPI(API_URL + WORKS_PATH);
  // let categories = datas;
  let editionMenu = document.querySelector("#edition-menu");

  editionMenu.innerHTML += `<div id="myModal" class="modal">
                                <div class="modal__content">
                                    <div class="modal__content__page1">
                                        <span class="modal__close-btn">&times;</span>
                                        <h2 class="modal__content__title1">Galerie photo</h2>
                                        <div class="modal__content__container1"></div>
                                        <input type="submit" class="modal__add-picture-btn" value="Ajouter une photo">
                                        <input type="submit" class="modal__remove-gallery-btn" value="Supprimer la galerie">
                                    </div>

                                    <div class="modal__content__page2">
                                        <span class="modal__previous-btn"></span>
                                        <span class="modal__close-btn">&times;</span>
                                        <h2 class="modal__content__title2">Ajout photo</h2>
                                        <div class="modal__content__container2">
                                            <form class="modal__form">
                                                <div class="modal__form__preview">
                                                    <div class="modal__form__preview-image">
                                                        <img class="modal__form__default-picture-preview" src="./assets/icons/send-pic.png">
                                                    </div>
                                                    <label class="modal__form__upload-picture-btn" for="image_uploads">+ Ajouter Photo</label>
                                                    <input type="file" id="image_uploads" name="image_uploads" accept=".jpg, .jpeg, .png" multiple="">
                                                    <p class="modal__form__info-format">jpg, png: 4mo max</p>
                                                </div>
                                                <label class="modal__form__label" for="titre">Titre</label>
                                                <input type="text" id="titre" name="titre">
                                                <label class="modal__form__label" for="categorie" name="categorie">Catégorie</label>
                                                <div class="modal__form__select-container">
                                                    <select id="categorie" name="categorie">
                                                        <option value=""></option>
                                                    </select>
                                                </div>
                                                <div class="modal__form__submit-btn-container">
                                                    <button class="modal__form__submit-btn" type="submit" disabled="">Valider</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>

    `;
  //Append select list of categories
  if (categories.length > 0) {
    for (let categorie of categories) {
      let { id, name } = categorie;
      document.querySelector(
        "#categorie"
      ).innerHTML += ` <option value = "${id}">${name}</option>`;
    }
  }
  generateModalGallery();
  // --- Events listener on modal

  // The preview
  const input = document.querySelector("#image_uploads");
  if (input != null) {
    input.addEventListener("change", updateImageDisplay);
  }

  //buttons
  window.addEventListener("click", (e) => {
    const modal = document.querySelector(".modal");
    const modalCloseButton = document.querySelector(".modal__close-btn");
    const modalPreviousButton = document.querySelector(".modal__previous-btn");
    const modalContentPage1 = document.querySelector(".modal__content__page1");
    const modalContentPage2 = document.querySelector(".modal__content__page2");
    const modalButtonAjouterPhoto = document.querySelector(
      ".modal__add-picture-btn"
    );
    // When the user clicks on <span> (x) or outside, remove the modal
    if (e.target == modal || e.target == modalCloseButton) {
      modal.remove();
    }
    // show page2 and hide page 1
    if (e.target == modalButtonAjouterPhoto) {
      modalContentPage1.style.position = "absolute";
      modalContentPage1.style.transform = "translateX(-101%)";
      modalContentPage2.style.transform = "translateX(0)";
      modalContentPage2.style.position = "relative";
    }
    // show page1 and hide page 2
    if (e.target == modalPreviousButton) {
      modalContentPage1.style.transform = "translateX(0)";
      modalContentPage1.style.position = "relative";
      modalContentPage2.style.transform = "translateX(101%)";
      modalContentPage2.style.position = "absolute";
    }
  });
}

export default callModal;
