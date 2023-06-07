import Api from "./Api.js";

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

async function handleFormSubmit(e) {
  e.preventDefault();
  const modalContentMessage = document.querySelector(
    ".modal__content__message"
  );
  modalContentMessage.innerHTML =
    '<p class="brown">En cours d\'envoi au serveur... Veuillez patienter.</p><i class="brown fa-solid fa-hourglass-start">';
  let modalForm = e.currentTarget;
  const pictureField = modalForm.elements["image"];
  const image = pictureField.files[0];
  const title = e.target.elements["title"].value;
  const category = e.target.elements["category"].value;
  let formData = new FormData();
  formData.append("image", image);
  formData.append("title", title);
  formData.append("category", category);

  let apiResp = await Api.setWork(formData);
  console.log(apiResp);
}

export default createWork;
