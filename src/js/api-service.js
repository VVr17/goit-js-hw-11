const API_KEY = '28871664-21007d01445281d8ccfafe378';
const BASE_URL = 'https://pixabay.com/api';


export default class PicturesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.picturesPerPage = 200;
    this.remainPagesCounter = 0;
  }

  fetchPhoto() {
    const url = `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.picturesPerPage}`
    return fetch(url).then(response => response.json())
  }

  resetPageAndCounter() {
    this.page = 1;
    this.remainPagesCounter = 0;
  }
}