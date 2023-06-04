import Api from "./Api.js";
import deleteWork from "./deleteWork.js";

/**
 *
 * This function ask for user works to API and add preview gallery to the modal box
 *
 */

async function generateModalGallery() {
  let works = await Api.getWorks();
  const modalContentContainer1 = document.querySelector(
    ".modal__content__container1"
  );
  if (works && works.length === 0) {
    modalContentContainer1.innerHTML = "";
  } else {
    modalContentContainer1.innerHTML = "";
    if (works && works.length > 0) {
      works.forEach((work) => {
        modalContentContainer1.innerHTML += `<figure>
                                              <img class = modal__content__picture src=${work.imageUrl} alt =${work.title}>
                                              <span class = modal__content__move-btn></span>
                                              <span data-id=${work.id} class = modal__content__trash-btn></span>
                                              <p class = modal__content__edit-btn>éditer</p>
                                            </figure>`;
      });
    }
    // add event listener on trash buttons
    const trashButtons = document.querySelectorAll(
      ".modal__content__trash-btn"
    );
    for (const trashButton of trashButtons) {
      trashButton.addEventListener("click", deleteWork);
    }
  }
  // add event listener on delete gallery button
  // const deleteGallery = document.querySelectorAll(".modal__remove-gallery-btn");
}

export default generateModalGallery;
