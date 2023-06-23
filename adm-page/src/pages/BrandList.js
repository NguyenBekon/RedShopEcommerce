import React, { useEffect } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBrands } from "../features/brand/brandSlice";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const BrandList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  const brandState = useSelector((state) => state.brand.brands);
  const data1 = [];
  for (let i = 0; i < brandState.length; i++) {
    data1.push({
      key: i + 1,
      brand: brandState[i].title,
      action: (
        <>
          <Link className=" fs-4 text-primary">
            <BiEdit />
          </Link>
          <Link className="ms-3 fs-4 text-danger ">
            <AiFillDelete />
          </Link>
        </>
      ),
    });
  }

  return (
    <div>
      <h3 className="mb-4 title">Brands List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default BrandList;
