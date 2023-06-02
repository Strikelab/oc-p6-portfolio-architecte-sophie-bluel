import generateModalGallery from "./generateModalGallery.js";
import generateWorks from "./generateWorks.js"

function deleteWork(e) {
  const id = e.target.dataset.id;
  console.log(`je suis la poubelle N° ${id}`);
  generateModalGallery();
  generateWorks();
}
export default deleteWork;
