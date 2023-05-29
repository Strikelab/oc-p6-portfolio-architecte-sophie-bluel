/**
 *
 * This function call a modal box
 * it takes the Title of the modal as parameter.
 *@param {string} modalTitle
 *
 */

function callModal(modalTitleContent = "you must enter a title") {
  // let body = document.querySelector("body");
  let editionMenu = document.querySelector("#edition-menu");
  // editionMenu.style.width = "100vw";
  // editionMenu.style.position = "fixed";
  // editionMenu.style.top = "0";
  // editionMenu.style.left = "0";
  //The Modal
  let modal = document.createElement("div");
  modal.id = "myModal";
  modal.classList.add("modal");

  //Modal content
  let modalContent = document.createElement("div");
  modalContent.classList.add("modal__content");

  //close button
  let modalCloseButton = document.createElement("span");
  modalCloseButton.classList.add("modal__close-btn");
  modalCloseButton.innerHTML = "&times;";
  let modalTitle = document.createElement("h2");
  modalTitle.classList.add("modal__title");
  modalTitle.innerText = modalTitleContent;
  let modalContentContainer = document.createElement("div");
  modalContentContainer.classList.add("modal__content__container");
  modal.innerHTML = "";
  //create fragment and add modal to DOM
  const fragment = document.createDocumentFragment();
  fragment.appendChild(modal);
  modal.appendChild(modalContent);
  modalContent.appendChild(modalCloseButton);
  modalContent.appendChild(modalTitle);
  modalContent.appendChild(modalContentContainer);
  editionMenu.appendChild(fragment);

  // When the user clicks on <span> (x), remove the modal and reset editionMenu
  modalCloseButton.addEventListener("click", () => {
    modal.remove();
    // editionMenu.removeAttribute("style");
  });

  // When the user clicks anywhere outside of the modal__content, remove the modal and reset editionMenu
  window.addEventListener("click", (e) => {
    if (e.target == modal) {
      modal.remove();
      // editionMenu.removeAttribute("style");
    }
  });
}

export default callModal;
