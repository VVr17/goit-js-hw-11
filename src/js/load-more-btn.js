export default class LoadMoreBtn {
  constructor(selector) {
    this.buttonRef = document.querySelector(selector);
    this.hidden = true;
  }

  addLoadMoreBtnHandler(handler) {
    this.buttonRef.addEventListener('click', handler);
  }

  disable() {
    this.buttonRef.setAttribute('disabled', true);
    this.buttonRef.textContent = 'Loading...';
  }

  enable() {
    this.buttonRef.removeAttribute('disabled');
    this.buttonRef.textContent = 'Load more';
  }

  hide() {
    this.buttonRef.classList.add('is-hidden');
    this.hidden = true;
  }

  show() {
    this.buttonRef.classList.remove('is-hidden');
    this.hidden = false;
  }
}