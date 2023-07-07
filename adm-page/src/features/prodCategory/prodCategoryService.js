import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const getProductCategories = async () => {
  const response = await axios.get(`${base_url}category/`);

  return response.data;
};
const createProdCategories = async (ProdCategory) => {
  const response = await axios.post(
    `${base_url}category/`,
    ProdCategory,
    config
  );

  return response.data;
};

const getProdCategoryById = async (id) => {
  const response = await axios.get(`${base_url}category/${id}`, config);

  return response.data;
};
const updateProdCategory = async (prodCate) => {
  const response = await axios.put(
    `${base_url}category/${prodCate.id}`,
    { title: prodCate.prodCateData.title },
    config
  );

  return response.data;
};
const deleteProdCategory = async (id) => {
  const response = await axios.delete(`${base_url}category/${id}`, config);

  return response.data;
};

const pCategoryService = {
  getProductCategories,
  createProdCategories,
  getProdCategoryById,
  updateProdCategory,
  deleteProdCategory,
};

export default pCategoryService;
