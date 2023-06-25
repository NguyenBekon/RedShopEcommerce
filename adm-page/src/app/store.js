import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import customerReducer from "../features/customers/customerSlice";
import productReducer from "../features/product/productSlice";
import brandReducer from "../features/brand/brandSlice";
import prodCategoryReducer from "../features/prodCategory/prodCategorySlice";
import colorReducer from "../features/color/colorSlice";
import blogReducer from "../features/blog/blogSlice";
import bCategoryReducer from "../features/bCategory/bCategorySlice";
import enquiriReducer from "../features/enquiry/enquirySlice";
import uploadReducer from "../features/upload/uploadSlice";
import couponReducer from "../features/coupon/couponSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    product: productReducer,
    brand: brandReducer,
    prodCategory: prodCategoryReducer,
    color: colorReducer,
    blog: blogReducer,
    bCategory: bCategoryReducer,
    enquiry: enquiriReducer,
    upload: uploadReducer,
    coupon: couponReducer,
  },
});
