import { DownOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Dropdown, Layout, Menu, theme } from "antd";
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const { Header, Content } = Layout;

const items = new Array(3).fill(null).map((_, index) => ({
  key: String(index + 1),
  label: `nav ${index + 1}`,
}));

const MainLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState("Date Range");
  const [selectedCategory, setSelectedCategory] = useState("Select a category");
  const [openUploadImageForm, setOpenUploadImageForm] = useState(false);

  const handleMenuClick = (e) => {
    setSelectedItem(` ${e.key}`);
  };
  const handleCategoryClick = (e) => {
    setSelectedCategory(` ${e.key}`);
  };

  const dateRanges = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Today",
      value: "today",
    },
    {
      label: "Yesterday",
      value: "yesterday",
    },
    {
      label: "This Month",
      value: "month",
    },
    {
      label: "This Year",
      value: "year",
    },
  ];

  const categoriesList = [
    {
      label: "Category 1",
      value: "category 1",
    },
    {
      label: "Category 2",
      value: "category 2",
    },
  ];

  const menu = (
    <Menu onClick={handleMenuClick}>
      {dateRanges.map((dateRange) => {
        return <Menu.Item key={dateRange.value}>{dateRange.label}</Menu.Item>;
      })}
    </Menu>
  );
  const categories = (
    <Menu onClick={handleCategoryClick}>
      {categoriesList.map((category) => {
        return <Menu.Item key={category.value}>{category.label}</Menu.Item>;
      })}
    </Menu>
  );

  const handleUploadImage = () => {
    navigate("/upload_image");
  };

  return (
    <Layout
      style={{
        height: "100vh",
      }}
    >
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          background: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontWeight: "bold",
            fontSize: "2rem",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          Lesson Capture
        </div>
        {/* <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items}
          style={{
            flex: 1,
            justifyContent: "flex-end",
          }}
        /> */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: ".8rem",
          }}
        >
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            style={{
              background: "linear-gradient(135deg, #6253e1, #04befe)",
            }}
            onClick={() => {
              handleUploadImage();
            }}
          >
            Upload Image
          </Button>
          <Button
            size="medium"
            style={{
              border: "1px solid #04befe",
            }}
          >
            Register
          </Button>
        </div>
      </Header>
      <Content
        style={{
          padding: "0 48px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 10,
          }}
        >
          <div
            style={{
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            <Dropdown overlay={menu} trigger={["click"]}>
              <Button>
                {selectedItem} <DownOutlined />
              </Button>
            </Dropdown>
          </div>
          <div
            style={{
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            <Dropdown overlay={categories} trigger={["click"]}>
              <Button>
                {selectedCategory} <DownOutlined />
              </Button>
            </Dropdown>
          </div>
        </div>
        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
};

export default MainLayout;
