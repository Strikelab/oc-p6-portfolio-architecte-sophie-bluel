function generateModalGallery(datas) {
  const modalContentContainer1 = document.querySelector(
    ".modal__content__container1"
  );
  if (datas && datas.length > 0) {
    datas.forEach((data) => {
      modalContentContainer1.innerHTML += `<figure>
                                              <img class = modal__content__picture src=${data.imageUrl} alt =${data.title}>
                                              <span class = modal__content__move-btn></span>
                                              <span class = modal__content__trash-btn></span>
                                              <p class = modal__content__edit-btn>éditer</p>
                                            </figure>`;
    });
  }
}

export default generateModalGallery;
