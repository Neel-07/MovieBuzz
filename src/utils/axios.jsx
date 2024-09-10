import axios from 'axios';

// Replace 'your_api_key_here' with your actual OMDb API key
const API_KEY = import.meta.env.VITE_OMDB_API_KEY; // Use environment variable

const instance = axios.create({
    baseURL: "https://www.omdbapi.com/", // Base URL without query parameters
    headers: {
        accept: "application/json",
    },
});

// Add API key to every request
instance.interceptors.request.use((config) => {
    config.params = {
        ...config.params,
        apikey: '57e8ebfc', // Add the API key here
    };
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default instance;
