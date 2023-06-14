import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

import { RxDashboard } from "react-icons/rx";
import { BsPersonFill, BsCartPlus } from "react-icons/bs";
import { LuFactory } from "react-icons/lu";
import { BiCategoryAlt } from "react-icons/bi";
import { AiOutlineBgColors, AiOutlineUnorderedList } from "react-icons/ai";
import { SiBrandfolder, SiMicrodotblog } from "react-icons/si";
import { FaRegListAlt } from "react-icons/fa";
import { FiPenTool } from "react-icons/fi";
import { GoQuestion } from "react-icons/go";
import { IoNotificationsOutline } from "react-icons/io5";

import AdmAvatar from "../images/asus2.jpg";
import { Layout, Menu, Button, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="text-white fs-5 text-center py-3 mb-0">
            <span className="sm-logo">RS</span>
            <span className="lg-logo">RedShop</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={(key) => {
            if (key === "signout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <RxDashboard className="fs-4" />,
              label: "Dashboard",
            },
            {
              key: "customers",
              icon: <BsPersonFill className="fs-4" />,
              label: "Customers",
            },
            {
              key: "catalog",
              icon: <LuFactory className="fs-4" />,
              label: "Catalog",
              children: [
                {
                  key: "product",
                  icon: <BsCartPlus className="fs-4" />,
                  label: "Add Product",
                },
                {
                  key: "product-list",
                  icon: <BsCartPlus className="fs-4" />,
                  label: "Product List",
                },
                {
                  key: "brand",
                  icon: <SiBrandfolder className="fs-4" />,
                  label: "Brand",
                },
                {
                  key: "brand-list",
                  icon: <SiBrandfolder className="fs-4" />,
                  label: "Brand List",
                },
                {
                  key: "category",
                  icon: <BiCategoryAlt className="fs-4" />,
                  label: "Category",
                },
                {
                  key: "category-list",
                  icon: <BiCategoryAlt className="fs-4" />,
                  label: "Category List",
                },
                {
                  key: "color",
                  icon: <AiOutlineBgColors className="fs-4" />,
                  label: "Color",
                },
                {
                  key: "color-list",
                  icon: <AiOutlineBgColors className="fs-4" />,
                  label: "Color List",
                },
              ],
            },
            {
              key: "orders",
              icon: <FaRegListAlt className="fs-4" />,
              label: "Orders",
            },
            {
              key: "blogs",
              icon: <SiMicrodotblog className="fs-4" />,
              label: "Blogs",
              children: [
                {
                  key: "blog",
                  icon: <FiPenTool className="fs-4" />,
                  label: "Add Blog",
                },
                {
                  key: "blog-list",
                  icon: <AiOutlineUnorderedList className="fs-4" />,
                  label: "Blog List",
                },
                {
                  key: "blog-category",
                  icon: <AiOutlineBgColors className="fs-4" />,
                  label: "Blog Category",
                },
                {
                  key: "blog-category-list",
                  icon: <AiOutlineUnorderedList className="fs-4" />,
                  label: "Blog Category List",
                },
              ],
            },
            {
              key: "enquiries",
              icon: <GoQuestion className="fs-4" />,
              label: "Enquiries",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="d-flex justify-content-between ps-1 pe-5"
          style={{ padding: 0, background: colorBgContainer }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div className="d-flex gap-3 align-items-center">
            <div className="position-relative">
              <IoNotificationsOutline className="fs-4" />
              <span className="badge bg-warning rounded-circle p-1 position-absolute">
                3
              </span>
            </div>
            <div className="d-flex gap-3 align-items-center">
              <div>
                <img width={32} height={32} src={AdmAvatar} alt="AdmAvatar" />
              </div>
              <div>
                <h5 className="mb-0">Admin</h5>
                <p className="mb-0">admin@gmail.com</p>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
