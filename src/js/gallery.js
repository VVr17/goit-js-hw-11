import photoCardTpl from '../templates/photo-card.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default class Gallery {
  constructor(selector) {
    this.ref = document.querySelector(selector);
  }

  render(pictures) {
    const picturesCardsMarkup = photoCardTpl(pictures);
    this.ref.insertAdjacentHTML('beforeend', picturesCardsMarkup);
  }

  onTotalPicturesLoaded() {
    Notify.info("We're sorry, but you've reached the end of search results.");
  }

  countTotalPictures(totalPictures) {
    if (totalPictures === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      throw new Error('no images matching search query');
    }
    Notify.success(`Hooray! We found ${totalPictures} images.`);
  }

  clear() {
    this.ref.innerHTML = '';
  }

  smoothScroll() {
    const { height: cardHeight } =
      this.ref.firstElementChild.getBoundingClientRect();
    
      window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}
