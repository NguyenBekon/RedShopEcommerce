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

const pCategoryService = {
  getProductCategories,
  createProdCategories,
};

export default pCategoryService;
