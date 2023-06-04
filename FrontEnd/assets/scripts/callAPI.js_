/**
 *
 * This function takes an url as argument
 * it makes API call and return a promise if no error occured
 * it throw and catch errors if needed
 * example :
 * cont myConstant = await callAPI('http://myurl.tld')
 * myConstant will be an array of objetcs in JSON format
 *
 * @param {string} url
 *
 */

async function callAPI(url) {
  return fetch(url)
    .then((response) => {
      //shorthand for status != 200
      if (response.ok) {
        return response.json();
      }
      throw Error(response.statusText);
    })
    .catch((error) => {
      console.error(
        `Une erreur est survenue lors de l'appel API: ${error.message}`
      );
    });
}

export default callAPI;
