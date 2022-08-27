import photoCardTpl from "./templates/photo-card.hbs";
import PicturesApiService from "./js/api-service";
import LoadMoreBtn from "./js/load-more-btn";
import SearchBtn from "./js/search-btn";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
}

const picturesApiService = new PicturesApiService();
const loadMoreBtn = new LoadMoreBtn('.js-load-more');
const searchBtn = new SearchBtn('.js-search-btn');

refs.form.addEventListener('submit', onSubmit);
loadMoreBtn.buttonRef.addEventListener('click', fetchAndRenderGallery);

function onSubmit(event) {
  event.preventDefault();

  if(!loadMoreBtn.hidden) {
    loadMoreBtn.hide();
  }

  picturesApiService.searchQuery = event.target.elements.searchQuery.value;

  picturesApiService.resetPage(); 
  clearGallery();

  searchBtn.disable();
  fetchAndRenderGallery();
  loadMoreBtn.show();
  event.target.reset();
}

function fetchAndRenderGallery() {
  loadMoreBtn.disable();

  picturesApiService.fetchPhoto()
  .then(({ hits, totalHits }) => {
    if (hits.length === 0) {
      Notify.failure('Sorry, there are no images matching your search query. Please try again.')
      return;
    }
    Notify.success(`Hooray! We found ${totalHits} images.`)
    return { hits, totalHits };
  })
  .then( ({ hits, totalHits }) => {
    renderGallery(hits);
    picturesApiService.page += 1;
    loadMoreBtn.enable();
    if(searchBtn.disabled) { 
      searchBtn.enable();
    }
  })
  .catch(error => {
    console.log(error)
    loadMoreBtn.hide();
    searchBtn.enable();
  })
}

function renderGallery(photos) {
  const photoCardsMarkup = photoCardTpl(photos);
  refs.gallery.insertAdjacentHTML('beforeend', photoCardsMarkup);
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}