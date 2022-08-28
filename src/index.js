import photoCardTpl from './templates/photo-card.hbs';
import PicturesApiService from './js/api-service';
import LoadMoreBtn from './js/load-more-btn';
import SearchBtn from './js/search-btn';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
};

const picturesApiService = new PicturesApiService();
const loadMoreBtn = new LoadMoreBtn('.js-load-more');
const searchBtn = new SearchBtn('.js-search-btn');

refs.form.addEventListener('submit', onSubmit);
loadMoreBtn.buttonRef.addEventListener('click', fetchAndRenderGallery);

function onSubmit(event) {
  event.preventDefault();

  if (!loadMoreBtn.hidden) {
    loadMoreBtn.hide();
  }

  picturesApiService.searchQuery = event.target.elements.searchQuery.value;

  picturesApiService.resetPageAndCounter();
  clearGallery();

  searchBtn.disable();
  fetchAndRenderGallery();
  event.target.reset();
}

function fetchAndRenderGallery() {
  loadMoreBtn.disable();

  picturesApiService
    .fetchPhoto()
    .then(renderGalleryAndSearchingForm)
    .catch(error => {
      console.log(error);
      loadMoreBtn.hide();
      searchBtn.enable();
    });
}

function renderGalleryAndSearchingForm({ hits, totalHits }) {

  if(picturesApiService.page === 1) {
    checkHitsLength(hits, totalHits);
  }
  
  setCounter(totalHits);
  renderGallery(hits);

  if(picturesApiService.remainPagesCounter === 0) {
    onTotalPicturesLoaded(); 
    return;
  }

  picturesApiService.page += 1;

  if (searchBtn.disabled) {
    searchBtn.enable();
  }
  if (loadMoreBtn.hidden) {
    loadMoreBtn.show();
  }
  loadMoreBtn.enable();
}

function checkHitsLength(hits, totalHits) {
  if (hits.length === 0) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    throw new Error();
  }
  Notify.success(`Hooray! We found ${totalHits} images.`);  
}

function setCounter(totalHits) {
  picturesApiService.remainPagesCounter = Math.ceil((totalHits / picturesApiService.picturesPerPage) - picturesApiService.page)
}

function renderGallery(photos) {
  const photoCardsMarkup = photoCardTpl(photos);
  refs.gallery.insertAdjacentHTML('beforeend', photoCardsMarkup);
}

function onTotalPicturesLoaded() {
  Notify.info("We're sorry, but you've reached the end of search results.")
  if (!loadMoreBtn.hidden) {
    loadMoreBtn.hide();
  }
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}
