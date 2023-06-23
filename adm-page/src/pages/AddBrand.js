import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import * as yup from "yup";
import { createBrands, resetState } from "../features/brand/brandSlice";
import CustomInput from "../components/CustomInput";

let schema = yup.object().shape({
  title: yup.string().required("Brand is required"),
});

const AddBrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newBrand = useSelector((state) => state.brand);
  const { isSuccess, isError, isLoading, createBrand } = newBrand;
  useEffect(() => {
    if (isSuccess && createBrand) {
      toast.success("Brand Added Successfullly!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createBrand]);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createBrands(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/list-brand");
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

export default AddBrand;
