const API_KEY = '22966044-c718c1bbe050e09f7279dea2f';
const perPage = 12;
const BASE_URL = 'https://pixabay.com/api';

function fetchImage(query, page) {
  return fetch(
    `${BASE_URL}/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`,
  )
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(new Error(`Нет изображения с названием ${query}`));
    })
    .then(images => images.hits);
}

export default fetchImage;
