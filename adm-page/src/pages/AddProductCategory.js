import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";

import * as yup from "yup";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import {
  createProdCategories,
  resetState,
  getProdCategoryById,
  updateAProdCategery,
} from "../features/prodCategory/prodCategorySlice";

let schema = yup.object().shape({
  title: yup.string().required("Product Category is required"),
});

const AddProductCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const getProdCateId = location.pathname.split("/")[3];
  const newProdCategory = useSelector((state) => state.prodCategory);
  const {
    isSuccess,
    isError,
    isLoading,
    createdProdCategory,
    prodCategoryName,
    updatedProdCategory,
  } = newProdCategory;

  useEffect(() => {
    if (getProdCateId !== undefined) {
      dispatch(getProdCategoryById(getProdCateId));
    } else {
      dispatch(resetState());
    }
  }, [getProdCateId, dispatch]);

  useEffect(() => {
    if (isSuccess && createdProdCategory) {
      toast.success("Product Category Added Successfullly!");
    }
    if (isSuccess && updatedProdCategory) {
      toast.success("Product Category Updated Successfullly!");
      navigate("/admin/list-categories");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [
    isSuccess,
    isError,
    isLoading,
    createdProdCategory,
    navigate,
    updatedProdCategory,
  ]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: prodCategoryName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getProdCateId !== undefined) {
        const data = { id: getProdCateId, prodCateData: values };
        dispatch(updateAProdCategery(data));
        dispatch(resetState());
      } else {
        dispatch(createProdCategories(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 3000);
      }
    },
  });
  return (
    <div>
      <h3 className="mb-4">
        {getProdCateId !== undefined ? "Edit" : "Add"} Product Category{" "}
      </h3>
      <form onSubmit={formik.handleSubmit}>
        <CustomInput
          type="text"
          label="Enter Product Category Name"
          name="title"
          onChng={formik.handleChange("title")}
          onBlr={formik.handleBlur("title")}
          val={formik.values.title}
        />
        <div className="error">
          {formik.touched.title && formik.errors.title}
        </div>

        <button
          className="btn btn-success border-0 rounded-3 my-5"
          type="submit"
        >
          {getProdCateId !== undefined ? "Edit" : "Add"} Product Category
        </button>
      </form>
    </div>
  );
};

export default AddProductCategory;
