/**
 * 
 * this function takes a file object and a maximum file size (byte) as argument
 * it return true or false according to the limit fileSize parameter.
 * Default file size max = 4mo 
 * 
 * @param {arrray} file
 * @param {int} fileSize
 * 
 */

function validFileSize(file, fileSize=4194304) {
  //www.mindgems.com/info/file-size/ => 4mo = 4194304 bytes
  return file.size < fileSize;
}

export default validFileSize;
