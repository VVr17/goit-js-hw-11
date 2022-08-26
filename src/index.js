import photoCardTpl from "./templates/photo-card.hbs";
import PicturesApiService from "./js/api-service";

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
}
const picturesApiService = new PicturesApiService();


refs.form.addEventListener('submit', onSubmit)

function onSubmit(event) {

  event.preventDefault();

  picturesApiService.searchQuery = event.target.elements.searchQuery.value;

  picturesApiService.fetchPhoto().then( ({ hits, totalHits }) => {
    console.log('totalHits',totalHits)
    console.log('hits',hits)

    renderPhotoCard(hits);
    picturesApiService.page += 1;
  })
  .catch(error => console.log(error))
}


function renderPhotoCard(photos) {

  const photoCardsMarkup = photoCardTpl(photos);
  refs.gallery.insertAdjacentHTML('beforeend', photoCardsMarkup);
}
