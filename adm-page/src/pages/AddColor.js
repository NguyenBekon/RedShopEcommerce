import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import * as yup from "yup";
import { createColors, resetState } from "../features/color/colorSlice";
import { useFormik } from "formik";

let schema = yup.object().shape({
  title: yup.string().required("Color is required"),
});

const AddColor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newColor = useSelector((state) => state.color);
  const { isSuccess, isError, isLoading, createdColor } = newColor;
  useEffect(() => {
    if (isSuccess && createdColor) {
      toast.success("Color Added Successfullly!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdColor]);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createColors(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/list-color");
      }, 3000);
    },
  });
  return (
    <div>
      <h3 className="mb-4">Add Color </h3>
      <form onSubmit={formik.handleSubmit}>
        <CustomInput
          type="text"
          label="Enter Color Name"
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

export default AddColor;
