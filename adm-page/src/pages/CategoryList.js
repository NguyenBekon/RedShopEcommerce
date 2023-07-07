import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteAProdCategory,
  getCategories,
  resetState,
} from "../features/prodCategory/prodCategorySlice";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const CategoryList = () => {
  const [open, setOpen] = useState(false);
  const [prodCateId, setProdCateId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setProdCateId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategories());
  }, [dispatch]);

  const pCatState = useSelector((state) => state.prodCategory.pCategories);
  const data1 = [];
  for (let i = 0; i < pCatState.length; i++) {
    data1.push({
      key: i + 1,
      name: pCatState[i].title,
      action: (
        <>
          <Link
            to={`/admin/category/${pCatState[i]._id}`}
            className=" fs-4 text-primary"
          >
            <BiEdit />
          </Link>
          <button
            onClick={() => showModal(pCatState[i]._id)}
            className="ms-3 fs-4 text-danger "
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const deleteProdCategory = (e) => {
    dispatch(deleteAProdCategory(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getCategories());
    }, 1000);
  };

  return (
    <div>
      <h3 className="mb-4 title">Category List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteProdCategory(prodCateId);
        }}
        title="Are you sure you want to delete this product category?"
      />
    </div>
  );
};

export default CategoryList;
