import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const API_KEY = '22104578-b37830bb47769ec8fcc7503cc';
export const perPage = 12;

export const getImages = async (query, page) => {
  const response = await axios.get(
    `?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
  );
  return response.data;
};
