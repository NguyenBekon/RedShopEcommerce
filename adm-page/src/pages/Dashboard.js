import React from "react";
import { BsArrowUpRight } from "react-icons/bs";
import { Column } from "@ant-design/plots";
import { Table } from "antd";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];
const data1 = [];
for (let i = 0; i < 46; i++) {
  data1.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

const Dashboard = () => {
  const data = [
    {
      type: "Jan",
      sales: 38,
    },
    {
      type: "Feb",
      sales: 52,
    },
    {
      type: "Mar",
      sales: 61,
    },
    {
      type: "Apr",
      sales: 145,
    },
    {
      type: "May",
      sales: 48,
    },
    {
      type: "June",
      sales: 38,
    },
    {
      type: "July",
      sales: 38,
    },
    {
      type: "Aug",
      sales: 38,
    },
    {
      type: "Sep",
      sales: 48,
    },
    {
      type: "Oct",
      sales: 58,
    },
    {
      type: "Nov",
      sales: 68,
    },
    {
      type: "Dec",
      sales: 88,
    },
  ];

  const config = {
    data,
    xField: "type",
    yField: "sales",
    color: "#ffd333",
    label: {
      position: "middle",

      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };
  return (
    <div>
      <h3 className="mb-4">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="">Total</p>
            <h4 className="mb-0">$1111</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6>
              <BsArrowUpRight className="mx-2 " />
              33%
            </h6>
            <p className="mb-0">Compared To April 2023</p>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="">Total</p>
            <h4 className="mb-0">$1111</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 style={{ color: "green" }}>
              <BsArrowUpRight className="mx-2 " />
              33%
            </h6>
            <p className="">Compared To April 2023</p>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="mb-0">Total</p>
            <h4 className="mb-0">$1111</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 style={{ color: "red" }}>
              <BsArrowUpRight className="mx-2 " />
              33%
            </h6>
            <p className="mb-0">Compared To April 2023</p>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="mb-4">Income Statics</h3>
        <div>
          <Column {...config} />;
        </div>
      </div>

      <div className="mt-4">
        <h3 className="mb-4">Recent Orders</h3>
        <div>
          <Table columns={columns} dataSource={data1} />;
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
