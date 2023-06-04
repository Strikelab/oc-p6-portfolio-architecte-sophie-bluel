import { currentToken, currentUserId } from "./env.js";
function createWork() {
  let pictureIsValid = null;
  let titleIsValid = null;
  let categorieIsValid = null;

  const modalForm = document.querySelector(".modal__form");
  const pictureField = modalForm.elements["image"];
  const titleField = modalForm.elements["title"];
  const categorieField = modalForm.elements["category"];
  const modalFormSubmitButton = modalForm.querySelector(
    ".modal__form__submit-btn"
  );
  pictureField.addEventListener("change", (e) => {
    pictureIsValid = e.target.value.length > 0;
    pictureIsValid && titleIsValid && categorieIsValid
      ? (modalFormSubmitButton.disabled = false)
      : (modalFormSubmitButton.disabled = true);
  });
  titleField.addEventListener("change", (e) => {
    titleIsValid = e.target.value.length > 0;
    pictureIsValid && titleIsValid && categorieIsValid
      ? (modalFormSubmitButton.disabled = false)
      : (modalFormSubmitButton.disabled = true);
  });
  categorieField.addEventListener("change", (e) => {
    categorieIsValid = e.target.value.length > 0;
    pictureIsValid && titleIsValid && categorieIsValid
      ? (modalFormSubmitButton.disabled = false)
      : (modalFormSubmitButton.disabled = true);
  });
  modalForm.addEventListener("submit", handleFormSubmit);
}

function handleFormSubmit(e) {
  e.preventDefault();
  console.log("form is submit");
let modalForm = e.currentTarget;
const pictureField = modalForm.elements["image"];
  const title = e.target.elements["title"].value;
  const category = e.target.elements["category"].value;
  const picture = e.target.elements["image"].value;
  const id = currentUserId;
  const token = currentToken;

  let formData = new FormData();
  formData.append("category", category);
  formData.append("image", image);
  formData.append("title", title)
  console.log(formData);
  console.log(pictureField.files[0])
}

export default createWork;
