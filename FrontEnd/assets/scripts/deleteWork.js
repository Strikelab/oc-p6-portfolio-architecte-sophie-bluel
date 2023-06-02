import { API_URL, WORKS_PATH, currentToken } from "./env.js";
import generateModalGallery from "./generateModalGallery.js";
import generateWorks from "./generateWorks.js";
import callAPI from "./callAPI.js";

async function deleteWork(e) {
  //get the item id by interrogating dataset
  const id = e.target.dataset.id;
  const modalContentContainer1 = document.querySelector(
    ".modal__content__container1"
  );

  //the delete request to the API
  let request = {
    method: "DELETE",
    headers: {
      Accept: "*/*",
      Authorization: `Bearer: ${currentToken}`,
    },
  };
  //send request to the API
  fetch(API_URL + WORKS_PATH + id, request);
  // ask api new works list
  let works = await callAPI(API_URL + WORKS_PATH);
  // recreate preview gallery and portfolio gallery
  modalContentContainer1.innerHTML = "";
  generateModalGallery(works);
  generateWorks(works);
}

export default deleteWork;
