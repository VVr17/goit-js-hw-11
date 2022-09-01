import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import Gallery from './js/gallery';
// import LoadMoreBtn from './js/load-more-btn';
import PicturesApiService from './js/api-service';
import SearchBtn from './js/search-btn';
import SearchingForm from './js/searching-form';

const picturesApiService = new PicturesApiService();
const gallery = new Gallery('.gallery');
const searchingForm = new SearchingForm('#search-form');
// const loadMoreBtn = new LoadMoreBtn('.js-load-more');
const loadingDots = document.querySelector('.loading-dots');
const searchBtn = new SearchBtn('.js-search-btn');
const galleryLightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 200,
});
const observer = new IntersectionObserver(onIntersection, { threshold: 0.2 });

searchingForm.addSubmitFormHandler(onSearchingFormSubmit);
// loadMoreBtn.buttonRef.addLoadMoreBtnHandler(fetchGalleryAndRenderPage);

function onSearchingFormSubmit(event) {
  event.preventDefault();
  // if (!loadMoreBtn.hidden) loadMoreBtn.hide();

  picturesApiService.searchQuery = event.target.elements.searchQuery.value;
  if (gallery.ref.children.length) {
    picturesApiService.resetPageAndCounter();
    gallery.clear();
  }

  searchBtn.disable();
  fetchGalleryAndRenderPage();
  event.target.reset();
}

async function fetchGalleryAndRenderPage() {
  // loadMoreBtn.disable();

  try {
    const data = await picturesApiService.fetchPhoto();
    renderGalleryAndSearchingForm(data);
  } catch (error) {
    console.log(error);
    // loadMoreBtn.hide();
    searchBtn.enable();
  }
}

function renderGalleryAndSearchingForm({ hits, totalHits }) {
  if (picturesApiService.page === 1) gallery.countTotalPictures(totalHits);
  if (picturesApiService.page > 1)
    observer.unobserve(gallery.ref.lastElementChild);

  picturesApiService.countRemainPages(totalHits);
  gallery.render(hits);
  galleryLightbox.refresh();

  if (picturesApiService.remainPages === 0) {
    gallery.onTotalPicturesLoaded();
    loadingDots.classList.remove('show');
    // loadMoreBtn.hide();
    if (searchBtn.disabled) searchBtn.enable();
    return;
  }

  if (hits.length < totalHits) observer.observe(gallery.ref.lastElementChild);
  if (picturesApiService.page > 1) gallery.smoothScroll();

  picturesApiService.incrementPage();

  if (searchBtn.disabled) searchBtn.enable();
  loadingDots.classList.remove('show');
  // if (loadMoreBtn.hidden) loadMoreBtn.show();
  // loadMoreBtn.enable();
}

function onIntersection(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      fetchGalleryAndRenderPage();
      loadingDots.classList.add('show');
    }
  });
}
