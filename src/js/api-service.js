import { Notify } from 'notiflix/build/notiflix-notify-aio';

const API_KEY = '28871664-21007d01445281d8ccfafe378';
const BASE_URL = 'https://pixabay.com/api';


export default class PicturesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchPhoto() {
    // per_page = 40
    const url = `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=5`
    
    return fetch(url).then(response => response.json())
  }

  resetPage() {
    this.page = 1;
  }
}