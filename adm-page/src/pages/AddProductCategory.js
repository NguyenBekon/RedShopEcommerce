import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";

import * as yup from "yup";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import {
  createProdCategories,
  resetState,
} from "../features/prodCategory/prodCategorySlice";

let schema = yup.object().shape({
  title: yup.string().required("Product Category is required"),
});

const AddProductCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newProdCategory = useSelector((state) => state.prodCategory);
  const { isSuccess, isError, isLoading, createdProdCategory } =
    newProdCategory;
  useEffect(() => {
    if (isSuccess && createdProdCategory) {
      toast.success("Product Category Added Successfullly!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdProdCategory]);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createProdCategories(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/list-category");
      }, 3000);
    },
  });
  return (
    <div>
      <h3 className="mb-4">Add Brand </h3>
      <form onSubmit={formik.handleSubmit}>
        <CustomInput
          type="text"
          label="Enter Brand Name"
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
          Add
        </button>
      </form>
    </div>
  );
};

export default AddProductCategory;
