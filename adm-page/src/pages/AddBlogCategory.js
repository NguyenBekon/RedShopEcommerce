import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import * as yup from "yup";
import {
  createBCategories,
  resetState,
} from "../features/bCategory/bCategorySlice";
import { useFormik } from "formik";

let schema = yup.object().shape({
  title: yup.string().required("Blog Category is required"),
});

const AddBlogCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newBCategory = useSelector((state) => state.bCategory);
  const { isSuccess, isError, isLoading, createdBCategory } = newBCategory;
  useEffect(() => {
    if (isSuccess && createdBCategory) {
      toast.success("Blog Category Added Successfullly!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdBCategory]);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createBCategories(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/blog-category-list");
      }, 3000);
    },
  });

  return (
    <div>
      <h3 className="mb-4">Add Blog Category </h3>
      <form onSubmit={formik.handleSubmit}>
        <CustomInput
          type="text"
          label="Enter Blog Category Name"
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

export default AddBlogCategory;
