import React from "react";
import { Table } from "antd";
// import { BiEdit } from "react-icons/bi";
// import { AiFillDelete } from "react-icons/ai";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
];
const data1 = [];
for (let i = 0; i < 46; i++) {
  data1.push({
    key: i,
    name: `Product ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

const ProductList = () => {
  return (
    <div>
      <h3 className="mb-4 title">Product List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />;
      </div>
    </div>
  );
};

export default ProductList;
