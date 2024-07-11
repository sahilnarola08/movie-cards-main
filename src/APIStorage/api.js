import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;
const apiClient = axios.create({
  baseURL: apiUrl,
});

export const loginuser = async (data) => {
  try {
    const response = await apiClient.post('/user/login', data);
    return response.data;
  } catch (error) {
    return { error: 'Error logging in', code: 500 };
  }
};

export const registrationuser = async (data) => {
  try {
    const response = await apiClient.post('/user/create', data);
    return response.data;
  } catch (error) {
    return { error: 'Error registering user', code: 500 };
  }
};

export const getUserById = async (id) => {
  try {
    const response = await apiClient.get(`/user/get/${id}`);
    return response.data;
  } catch (error) {
    return { error: 'Error fetching movie by id', code: 500 };
  }
};

export const addMovie = async (data) => {
  try {
    const response = await apiClient.post('/movie/create', data);
    return response.data;
  } catch (error) {
    return { error: 'Error adding movie', code: 500 };
  }
};

export const getMovies = async () => {
  try {
    const response = await apiClient.get('/movie/get');
    return response.data;
  } catch (error) {
    return { error: 'Error fetching movies', code: 500 };
  }
};

export const getMovieById = async (id) => {
  try {
    const response = await apiClient.get(`/movie/get/${id}`);
    return response.data;
  } catch (error) {
    return { error: 'Error fetching movie by id', code: 500 };
  }
};

export const updateMovie = async (id, data) => {
  try {
    const response = await apiClient.put(`/movie/update/${id}`, data);
    return response.data;
  } catch (error) {
    return { error: 'Error updating movie', code: 500 };
  }
};