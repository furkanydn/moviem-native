export const ROOT_URL = 'https://api.themoviedb.org/3';
export const REGISTRATION_URL = 'https://www.themoviedb.org/account/signup';
export const RESET_PASSWORD_URL =
  'https://www.themoviedb.org/account/reset-password';
export const API_KEY = '1a6c5679f1a870fdd2b486f96e6bd7ff';
export const withKEY = (url: string) => `${url}?api_key=${API_KEY}`;

const IMAGE_URL = 'https://image.tmdb.org/t/p/';
export const getSmallImageUrl = (imagePath: string) =>
  `${IMAGE_URL}w185${imagePath}`;
export const getMediumImageUrl = (imagePath: string) =>
  `${IMAGE_URL}w780${imagePath}`;
export const getBigImageUrl = (imagePath: string) =>
  `${IMAGE_URL}w1280${imagePath}`;

export const getIMDB_Url = (iID: string) => `https://www.imdb.com/title/${iID}`;
