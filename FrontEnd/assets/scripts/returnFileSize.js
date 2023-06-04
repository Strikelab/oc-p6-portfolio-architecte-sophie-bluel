/**
 *
 * This function takes a number as argument it convert it with the good unit with 1 decimal
 * bytes, KBytes, MBytes
 * @param {int} number "File size in bytes"
 *
 */


function returnFileSize(number) {
    if (number < 1024) {
      return number + "bytes";
    } else if (number > 1024 && number < 1048576) {
      return (number / 1024).toFixed(1) + "KB";
    } else if (number > 1048576) {
      return (number / 1048576).toFixed(1) + "MB";
    }
  }

  export default returnFileSize;