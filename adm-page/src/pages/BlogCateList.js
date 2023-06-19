import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { getBCategories } from "../features/bCategory/bCategorySlice";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    // sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const BlogCateList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBCategories());
  }, [dispatch]);

  const bCategoryState = useSelector((state) => state.bCategory.bCategories);
  const data1 = [];
  for (let i = 0; i < bCategoryState.length; i++) {
    data1.push({
      key: i + 1,
      name: bCategoryState[i].title,
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
      <h3 className="mb-4 title">Blog Category List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default BlogCateList;
