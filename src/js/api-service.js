import axios from 'axios';

export default class PicturesApiService {
  #API_KEY = '28871664-21007d01445281d8ccfafe378';
  #BASE_URL = 'https://pixabay.com/api';

  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.picturesPerPage = 40;
    this.remainPages = 0;
  }

  // fetchPhoto() {
  //   fetch(`https://pixabay.com/api?key=28871664-21007d01445281d8ccfafe378&q=cat&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40`).
  //   then(response => response.json)
  // }

  async fetchPhoto() {
    const params = {
      key: this.#API_KEY,
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: this.page,
      per_page: this.picturesPerPage,
    };

    try {
      // const response = await axios.get(this.#BASE_URL, { params });
      const response = await axios.get(`https://pixabay.com/api?key=28871664-21007d01445281d8ccfafe378&q=cat`);
      return response.data;

    } catch (error) {
      console.error(error);
      console.log(error.response.status);
    }
  }

  countRemainPages(totalPictures) {
    this.remainPages =
      Math.ceil(totalPictures / this.picturesPerPage) - this.page;
  }

  resetPageAndCounter() {
    this.page = 1;
    this.remainPages = 0;
  }
}
