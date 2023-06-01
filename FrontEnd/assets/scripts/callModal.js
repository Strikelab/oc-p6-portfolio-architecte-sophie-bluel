/**
 *
 * This function call a modal box
 * it takes the Title of the modal as parameter.
 * @param {array} datas
 * @param {string} modalTitle
 *
 */

function callModal(modalTitleContent = "you must enter a title", datas = {}) {
  let categories = datas;
  let editionMenu = document.querySelector("#edition-menu");
  let modal = document.createElement("div");
  modal.id = "myModal";
  modal.classList.add("modal");
  //Modal content
  let modalContent = document.createElement("div");
  modalContent.classList.add("modal__content");
  //buttons
  // (x)
  let modalCloseButton1 = document.createElement("span");
  modalCloseButton1.classList.add("modal__close-btn");
  modalCloseButton1.innerHTML = "&times;";
  let modalCloseButton2 = document.createElement("span");
  modalCloseButton2.classList.add("modal__close-btn");
  modalCloseButton2.innerHTML = "&times;";
  // (<-)
  let modalPreviousButton = document.createElement("span");
  modalPreviousButton.classList.add("modal__previous-btn");
  // modalPreviousButton.innerHTML = "←";
  //titres
  let modalTitle1 = document.createElement("h2");
  modalTitle1.classList.add("modal__content__title1");
  modalTitle1.innerText = "Galerie photo";
  let modalTitle2 = document.createElement("h2");
  modalTitle2.classList.add("modal__content__title2");
  modalTitle2.innerText = "Ajout photo";
  //pages
  let modalContentPage1 = document.createElement("div");
  modalContentPage1.classList.add("modal__content__page1");
  let modalContentPage2 = document.createElement("div");
  modalContentPage2.classList.add("modal__content__page2");
  modal.innerHTML = "";
  let modalContentContainer1 = document.createElement("div");
  modalContentContainer1.classList.add("modal__content__container1");
  let modalContentContainer2 = document.createElement("div");
  modalContentContainer2.classList.add("modal__content__container2");
  //create fragment and add modal to DOM
  //page1
  const fragment = document.createDocumentFragment();
  fragment.appendChild(modal);
  modal.appendChild(modalContent);
  modalContent.appendChild(modalContentPage1);
  modalContentPage1.appendChild(modalCloseButton1);
  modalContentPage1.appendChild(modalTitle1);
  modalContentPage1.appendChild(modalContentContainer1);
  modalContent.appendChild(modalContentPage2);
  modalContentPage2.appendChild(modalPreviousButton);
  modalContentPage2.appendChild(modalCloseButton2);
  modalContentPage2.appendChild(modalTitle2);
  modalContentPage2.appendChild(modalContentContainer2);
  editionMenu.appendChild(fragment);
  // other way to add elements to DOM
  //page 2
  modalContentContainer2.innerHTML += `<form class ="modal__form">
                                           <div class="modal__form__preview">
                                                <div class="modal__form__preview-image">
                                                    <img class=modal__form__default-picture-preview src="./assets/icons/send-pic.png">
                                                </div>
                                                <label class="modal__form__upload-picture-btn" for="image_uploads">+ Ajouter Photo</label>
                                                <input type="file" id="image_uploads" name="image_uploads" accept=".jpg, .jpeg, .png" multiple>
                                                <p class="modal__form__info-format">jpg, png: 4mo max</p>
                                            </div> 
                                            <label class="modal__form__label" for "titre">Titre</label>
                                            <input type="text" id="titre" name="titre">
                                            <label class="modal__form__label" for "categorie" name="categorie">Catégorie</label>
                                            <div class="modal__form__select-container">
                                                <select id="categorie" name="categorie"> 
                                                    <option value = ""></option>
                                                <select>
                                            </div>
                                            <div class="modal__form__submit-btn-container">
                                                <button class="modal__form__submit-btn" type="submit" >Valider</button>
                                            </div>
                                        </form>                       
  `;

  //append list of categories.
  for (let categorie of categories) {
    let { id, name } = categorie;
    document.querySelector(
      "#categorie"
    ).innerHTML += ` <option value = "${id}">${name}</option>`;
  }

  //the preview
  const preview = document.querySelector(".modal__form__preview-image");
  const input = document.querySelector("#image_uploads");
  if(input != null) {
    input.addEventListener("change", updateImageDisplay);
  }

  function updateImageDisplay() {
    const defaultPicturePreview = document.createElement("img");
    defaultPicturePreview.src = "./assets/icons/send-pic.png";
    defaultPicturePreview.classList.add("modal__form__default-picture-preview");

    while (preview.firstChild) {
      preview.removeChild(preview.firstChild);
    }

    const curFiles = input.files;
    if (curFiles.lenth !== 0) {
      console.log(curFiles);
    }
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
        console.log(validFileSize(file));
        if (validFileType(file) && validFileSize(file)) {
          para.textContent = `${file.name}, file size ${returnFileSize(
            file.size
          )}.`;
          const image = document.createElement("img");
          image.classList.add("modal__form__picture-preview");
          image.src = URL.createObjectURL(file);
          listItem.appendChild(image);
          listItem.appendChild(para);
        } else if (!validFileSize(file)) {
          para.textContent = `${returnFileSize(
            file.size
          )}File size exceeds the limit.`;
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

  // https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types
  const fileTypes = [
    "image/apng",
    // "image/bmp",
    // "image/gif",
    "image/jpeg",
    "image/pjpeg",
    "image/png",
    // "image/svg+xml",
    // "image/tiff",
    // "image/webp",
    // `image/x-icon`,
  ];

  function validFileSize(file) {
    //www.mindgems.com/info/file-size/
    return file.size < 4194304;
  }

  function validFileType(file) {
    return fileTypes.includes(file.type);
  }

  function returnFileSize(number) {
    if (number < 1024) {
      return number + "bytes";
    } else if (number > 1024 && number < 1048576) {
      return (number / 1024).toFixed(1) + "KB";
    } else if (number > 1048576) {
      return (number / 1048576).toFixed(1) + "MB";
    }
  }

  //##########################################################

  // When the user clicks on <span> (x), remove the modal
  // When the user clicks anywhere outside of the modal__content, remove the modal
  window.addEventListener("click", (e) => {
    if (
      e.target == modal ||
      e.target == modalCloseButton1 ||
      e.target == modalCloseButton2
    ) {
      modal.remove();
    }
    if (e.target == modalPreviousButton) {
      modalContentPage1.style.transform = "translateX(0)";
      modalContentPage2.style.transform = "translateX(101%)";
      modalContentPage1.style.position = "relative";
      modalContentPage2.style.position = "absolute";
    }
  });
}

export default callModal;
