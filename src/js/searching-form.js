export default class SearchingForm {
  constructor(selector) {
    this.ref = document.querySelector(selector);
  }

  addSubmitFormHandler(handler) {
    this.ref.addEventListener('submit', handler);
  }
}