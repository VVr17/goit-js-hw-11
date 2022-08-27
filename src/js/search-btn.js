export default class SearchBtn {
  constructor(selector) {
    this.buttonRef = document.querySelector(selector);
    this.disabled = false; 
  }

  disable() {
    this.buttonRef.setAttribute('disabled', true);
    this.buttonRef.childNodes[0].textContent = 'Searching...';
    this.disabled = true;
  }

  enable() {
    this.buttonRef.removeAttribute('disabled');
    this.buttonRef.childNodes[0].textContent = 'Search';
    this.disabled = false;
  }
}