/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import * as yup from "yup";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createBlogs, resetState } from "../features/blog/blogSlice";
import { getBCategories } from "../features/bCategory/bCategorySlice";
import { useFormik } from "formik";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import Dropzone from "react-dropzone";

let schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description  is required"),
  category: yup.string().required("Category is Required"),
});

const AddBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getBCategories());
  }, [dispatch]);

  const bCategoryState = useSelector((state) => state.bCategory.bCategories);

  const imgState = useSelector((state) => state.upload.images);

  const blogState = useSelector((state) => state.blog);
  const { isSuccess, isError, isLoading, createdBlog } = blogState;
  useEffect(() => {
    if (isSuccess && createdBlog) {
      toast.success("Blog Added Successfullly!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdBlog]);

  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  useEffect(() => {
    formik.values.images = img;
  }, [img]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
      images: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createBlogs(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/blog-list");
      }, 3000);
    },
  });

  return (
    <div>
      <h3 className="mb-4">Add Blog </h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <CustomInput
            type="text"
            label="Enter Blog Title"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>

          <div className="">
            <ReactQuill
              theme="snow"
              name="description"
              onChange={formik.handleChange("description")}
              value={formik.values.description}
            />
          </div>
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>

          <select
            name="category"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">Select Blog Category</option>
            {bCategoryState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>

          <div className="bg-white border-1 p-5 text-center">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>

          <div className="showimages d-flex flex-wrap gap-3">
            {imgState?.map((i, j) => {
              return (
                <div className=" position-relative" key={j}>
                  <button
                    type="button"
                    onClick={() => dispatch(delImg(i.public_id))}
                    className="btn-close position-absolute"
                    style={{ top: "10px", right: "10px" }}
                  ></button>
                  <img src={i.url} alt="" width={450} height={250} />
                </div>
              );
            })}
          </div>

          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
