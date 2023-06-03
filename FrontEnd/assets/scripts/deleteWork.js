import { API_URL, WORKS_PATH, currentToken } from "./env.js";
import generateModalGallery from "./generateModalGallery.js";
import generateWorks from "./generatePortFolioGallery.js";
import callAPI from "./callAPI.js";

async function deleteWork(e) {
  //get the item id by interrogating dataset
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
  //erase gallery !
  if (e.target.matches(".modal__remove-gallery-btn")) {
    console.log("^_^ -- Je vais delete la gallerie -- ^_^");
    let works = await callAPI(API_URL + WORKS_PATH);
    for (let work of works) {
      let id = work.id;
      console.log("Work " + id + " will be delete ^_^");
      fetch(API_URL + WORKS_PATH + id, request);
      console.log("Work " + id + " has been deleted ^_^");
    }
    //erase item selected !
  } else if (e.target.matches(".modal__content__trash-btn")) {
    let id = e.target.dataset.id;
    console.log("Work " + id + " will be delete ^_^");
    //send delete request to the API
    fetch(API_URL + WORKS_PATH + id, request);
    console.log("Work " + id + " has been deleted ^_^");
  }
  // renew gallery list
  let works = await callAPI(API_URL + WORKS_PATH);
  // recreate preview gallery and portfolio gallery
  modalContentContainer1.innerHTML = "";
  generateModalGallery(works);
  generateWorks(works);
}

export default deleteWork;
