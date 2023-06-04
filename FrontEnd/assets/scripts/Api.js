import { API_URL, WORKS_PATH, CATEGORIES_PATH, currentToken } from "./env.js";
import generateModalGallery from "./generateModalGallery.js";

class Api {
  constructor() {}
  // return API list of works
  static async getWorks() {
    return fetch(API_URL + WORKS_PATH)
      .then((response) => response.json())
      .catch((error) =>
        console.log(
          "une erreur est survenue lors de la récupération des Travaux :" +
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
          "Une erreur est survenue lors de la récupération des catégories" +
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
}
export default Api;
