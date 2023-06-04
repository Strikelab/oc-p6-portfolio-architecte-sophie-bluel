import Api from "./Api.js";
import generateModalGallery from "./generateModalGallery.js";
import generatePortFolioGallery from "./generatePortFolioGallery.js";

/**
 *
 * This function wait for event on buttons and delete work or entire gallery
 *
 */

async function deleteWork(e) {
  //get the item id by interrogating dataset
  const modalContentContainer1 = document.querySelector(
    ".modal__content__container1"
  );
  if (e.target.matches(".modal__remove-gallery-btn")) {
    Api.deleteGallery();
  } else if (e.target.matches(".modal__content__trash-btn")) {
    let id = e.target.dataset.id;
    Api.deleteWork(id);
  }
  generateModalGallery();
  generatePortFolioGallery();
}

export default deleteWork;
