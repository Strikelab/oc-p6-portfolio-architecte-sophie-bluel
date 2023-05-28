/**
 *
 * This function call a modal box
 *
 *
 */

function callModal() {
  let body = document.querySelector("body");

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
  modalTitle.innerText = "My pretty title";
  let someContent = document.createElement("p");
  someContent.innerText = "Some Content";

  //create fragment and add modal to DOM
  const fragment = document.createDocumentFragment();
  fragment.appendChild(modal);
  modal.appendChild(modalContent);
  modalContent.appendChild(modalCloseButton);
  modalContent.appendChild(modalTitle);
  modalContent.appendChild(someContent);
  body.appendChild(fragment);

  // When the user clicks on <span> (x), remove the modal
  modalCloseButton.addEventListener("click", () => {
    modal.remove();
  });

  // When the user clicks anywhere outside of the modal__content, remove the modal
  window.addEventListener("click", (e) => {
    if (e.target == modal) {
      modal.remove();
    }
  });
}
export default callModal;
