import { API_URL, WORKS_PATH, currentUserId } from "./env.js";
import callAPI from "./callAPI.js";

/**
 *
 * This function ask for user works to API and add user works gallery to portFolio
 *
 */

async function generatePortFolioGallery() {
  let works = await callAPI(API_URL + WORKS_PATH);
  if (works) {
    const divGallery = document.querySelector(".gallery");
    divGallery.innerHTML = "";
    // Add works to DOM
    works.forEach((work) => {
      if (currentUserId === work.userId) {
        // DOM Childs
        const figure = document.createElement("figure");
        const workPicture = document.createElement("img");
        const workFigCaption = document.createElement("figcaption");
        //test if API is deployed somewhere else than localhost.
        if (API_URL !== "http://localhost:5678") {
          work.imageUrl = work.imageUrl.replace(
            "http://localhost:5678",
            API_URL
          );
        }
        workPicture.src = work.imageUrl;
        workPicture.setAttribute("alt", `${work.title}`);
        workFigCaption.textContent = `${work.title}`;
        // Use a DocumentFragment to append elements to the DOM in a single operation.
        const fragment = document.createDocumentFragment();
        fragment.appendChild(figure);
        figure.appendChild(workPicture);
        figure.appendChild(workFigCaption);
        divGallery.appendChild(fragment);
      }
    });
  }
  console.log(`Le portFolio a été régénéré`);
}
export default generatePortFolioGallery;
