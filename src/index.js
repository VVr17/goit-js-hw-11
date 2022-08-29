import Gallery from './js/gallery';
import PicturesApiService from './js/api-service';
// import LoadMoreBtn from './js/load-more-btn';
import SearchBtn from './js/search-btn';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const picturesApiService = new PicturesApiService();
const gallery = new Gallery({
  formSelector: '#search-form',
  gallerySelector: '.gallery',
});
// const loadMoreBtn = new LoadMoreBtn('.js-load-more');
const loadingDots = document.querySelector('.loading');
const searchBtn = new SearchBtn('.js-search-btn');
const galleryLightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 200,
});
const observer = new IntersectionObserver(onInterception, { threshold: 0.1 });

gallery.formRef.addEventListener('submit', onSubmit);
// loadMoreBtn.buttonRef.addEventListener('click', fetchGalleryAndRenderPage);

function onSubmit(event) {
  event.preventDefault();
  // if (!loadMoreBtn.hidden) {loadMoreBtn.hide();}

  picturesApiService.searchQuery = event.target.elements.searchQuery.value;
  picturesApiService.resetPageAndCounter();
  gallery.clear();
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
  if (picturesApiService.page === 1) {
    gallery.countTotalPictures(totalHits);
  }

  picturesApiService.countRemainPages(totalHits);
  gallery.render(hits);
  galleryLightbox.refresh();

  if (picturesApiService.remainPages === 0) {
    gallery.onTotalPicturesLoaded();
    loadingDots.classList.remove('show');
    // loadMoreBtn.hide();
    if (searchBtn.disabled) { searchBtn.enable();}
    return;
  }

  if (hits.length <= totalHits) {
    observer.observe(gallery.ref.lastElementChild);
  }

  if (picturesApiService.page > 1) {
    gallery.smoothScroll();
  }

  picturesApiService.page += 1;

  if (searchBtn.disabled) {
    searchBtn.enable();
  }
  loadingDots.classList.remove('show');
  // if (loadMoreBtn.hidden) { loadMoreBtn.show();}
  // loadMoreBtn.enable();
}

function onInterception(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log('Привет из колбека в forEach');
      fetchGalleryAndRenderPage();
      loadingDots.classList.add('show');
    }
  });
}
