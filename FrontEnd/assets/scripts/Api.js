import { API_URL, WORKS_PATH, CATEGORIES_PATH, currentToken } from "./env.js";
import generateModalGallery from "./generateModalGallery.js";
import generatePortFolioGallery from "./generatePortFolioGallery.js";
class Api {
  constructor() {}
  // return API list of works
  static async getWorks() {
    return fetch(API_URL + WORKS_PATH)
      .then((response) => response.json())
      .catch((error) =>
        console.log(
          "une erreur est survenue lors de la récupération des Travaux : " +
            error.message
        )
      );
  }
  //return API list of categories
  static async getCategories() {
    return fetch(API_URL + CATEGORIES_PATH)
      .then((response) => response.json())
      .catch((error) =>
        console.log(
          "Une erreur est survenue lors de la récupération des Catégories : " +
            error.message
        )
      );
  }
  //send DELETE request to API
  static async deleteWork(id) {
    let request = {
      method: "DELETE",
      headers: {
        Accept: "*/*",
        Authorization: `Bearer: ${currentToken}`,
      },
    };

    //send delete request to the API
    fetch(API_URL + WORKS_PATH + id, request).catch((error) => {
      console.log(
        "une erreur est survenue lors de l'effacement du travail id:" +
          id +
          " " +
          error.message
      );
    });
  }
  //DELETE All Works
  static async deleteGallery() {
    let works = await this.getWorks();
    for (let work of works) {
      let id = work.id;
      this.deleteWork(id);
    }
    generateModalGallery();
  }

  //CREATE WORK

  static async setWork(formData) {
    let request = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + currentToken,
      },
      body: formData,
    };

    //send create work request to the API

    return fetch(API_URL + WORKS_PATH, request)
      .then((response) => {
        if (response.ok) {
          document.querySelector(".modal").remove();
          generatePortFolioGallery();
          return response.json();
        }
        let e = new Error("Bad request");
        throw e;
      })
      .then((jsonData) => {
        return jsonData;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
export default Api;
