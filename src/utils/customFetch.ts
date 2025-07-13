import axios from 'axios';

// Define the base URL for the production API
const productionUrl = 'https://strapi-store-server.onrender.com/api';

// Create a custom axios instance with the base URL preset
export const customFetch = axios.create({
  baseURL: productionUrl,
});

// Send a GET request to the /products endpoint using the custom axios instance
// This is equivalent to: axios.get('https://strapi-store-server.onrender.com/api/products')
// customFetch.get('/products');
