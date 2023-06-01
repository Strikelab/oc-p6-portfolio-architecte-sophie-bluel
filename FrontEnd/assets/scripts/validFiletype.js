const fileTypes = ["image/apng", "image/jpeg", "image/pjpeg", "image/png"];

/**
 * 
 * this function takes a file object as argument and check file type validity
 * according to a list of fileTypes authorized
 * 
 * @param {arrray} file
 * 
 */

function validFileType(file) {
  return fileTypes.includes(file.type);
}

export default validFileType;