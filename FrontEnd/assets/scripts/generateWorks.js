import { API_URL, currentUserId } from "./env.js";

/**
 *
 * This function takes an array of object as argument.
 * It add elements to DOM, and generate portfolio gallery
 *
 *
 * @param {array} datas
 *
 */

function generateWorks(datas) {
  if (datas && datas.length > 0) {
    const divGallery = document.querySelector(".gallery");
    divGallery.innerHTML = "";
    // Add works to DOM
    datas.forEach((data) => {
      if (currentUserId === data.userId) {
        // DOM Childs
        const figure = document.createElement("figure");
        const workPicture = document.createElement("img");
        const workFigCaption = document.createElement("figcaption");
        //test if API is deployed somewhere else than localhost.
        if (API_URL !== "http://localhost:5678") {
          data.imageUrl = data.imageUrl.replace(
            "http://localhost:5678",
            API_URL
          );
        }
        workPicture.src = data.imageUrl;
        workPicture.setAttribute("alt", `${data.title}`);
        workFigCaption.textContent = `${data.title}`;
        // Use a DocumentFragment to append elements to the DOM in a single operation.
        const fragment = document.createDocumentFragment();
        fragment.appendChild(figure);
        figure.appendChild(workPicture);
        figure.appendChild(workFigCaption);
        divGallery.appendChild(fragment);
      }
    });
  }
}
export default generateWorks;
