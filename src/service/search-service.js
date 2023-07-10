import axios from 'axios';

export const getFound = async ({ query }, page ) => {
  const API_KEY = '36730678-336aeda16ae09d290d6765b0a';
  const BASE_URL = 'https://pixabay.com/api/';
  const { data } = await axios.get(
    `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return data;
};
