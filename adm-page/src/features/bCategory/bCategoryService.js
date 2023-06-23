import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const getBCategories = async () => {
  const response = await axios.get(`${base_url}blogcategory/`);

  return response.data;
};
const createBCategories = async (BCategory) => {
  const response = await axios.post(
    `${base_url}blogcategory/`,
    BCategory,
    config
  );

  return response.data;
};
const bCategoryService = {
  getBCategories,
  createBCategories,
};

export default bCategoryService;
