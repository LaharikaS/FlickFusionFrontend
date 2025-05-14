import axios from 'axios';

const API_URL = '/api/categories/';

// Get all categories
const getCategories = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get category by ID
const getCategoryById = async (categoryId) => {
  const response = await axios.get(API_URL + categoryId);
  return response.data;
};

const categoryService = {
  getCategories,
  getCategoryById,
};

export default categoryService; 