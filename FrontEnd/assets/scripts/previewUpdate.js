import validFileSize from "./validFileSize.js";
import validFileType from "./validFiletype.js";
import returnFileSize from "./returnFileSize.js";

/**
 *
 * this function updates preview picture in modal box and check
 * if size and type of the file uploaded are valid.
 * it returns some information to the user about the file uploaded
 *
 * @param {arrray} file
 *
 */

function previewUpdate() {
  const fileSizeMax = 4194304;
  const preview = document.querySelector(".modal__form__preview-image");
  const input = document.querySelector("#image_uploads");
  const defaultPicturePreview = document.createElement("img");
  defaultPicturePreview.src = "./assets/icons/send-pic.png";
  defaultPicturePreview.classList.add("modal__form__default-picture-preview");
  // remove default picture.
  while (preview.firstChild) {
    preview.removeChild(preview.firstChild);
  }
  //get input file
  const curFiles = input.files;
  if (curFiles.lenth !== 0) {
  }
  //get informations about the file uploaded and append the DOM according to the file informations
  if (curFiles.length === 0) {
    const para = document.createElement("p");
    para.textContent = "No files currently selected for upload";
    preview.appendChild(para);
  } else {
    const list = document.createElement("ol");
    preview.appendChild(list);

    for (const file of curFiles) {
      const listItem = document.createElement("li");
      const para = document.createElement("p");

      if (validFileType(file) && validFileSize(file, fileSizeMax)) {
        para.textContent = `${file.name}, file size ${returnFileSize(
          file.size
        )}.`;
        const image = document.createElement("img");
        image.classList.add("modal__form__picture-preview");
        image.src = URL.createObjectURL(file);
        listItem.appendChild(image);
        listItem.appendChild(para);
      } else if (!validFileSize(file, fileSizeMax)) {
        para.textContent = `${returnFileSize(
          file.size
        )} File size exceeds the limit of ${returnFileSize(
          fileSizeMax
        )} authorized.`;

        listItem.appendChild(defaultPicturePreview);
        listItem.appendChild(para);
        input.value = "";
      } else {
        para.textContent = `File name ${file.name}: Not a valid file type. Update your selection.`;
        listItem.appendChild(defaultPicturePreview);
        listItem.appendChild(para);
        input.value = "";
      }

      list.appendChild(listItem);
    }
  }
}

export default previewUpdate;
