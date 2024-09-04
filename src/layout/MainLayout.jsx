import { DownOutlined, LeftOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Dropdown,
  FloatButton,
  Grid,
  Image,
  Layout,
  Menu,
  theme,
} from "antd";
import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import logo1 from "../assets/lesson-capture-logo.svg";

const { useBreakpoint } = Grid;

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
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState("Date Range");
  const [selectedCategory, setSelectedCategory] = useState("Select a category");
  const screens = useBreakpoint();

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
    navigate("/upload_image", {
      state: {
        from_upload_image: true,
      },
    });
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
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: screens.xs ? "0 8px" : "0 50px",
        }}
      >
        <div
          style={{
            fontWeight: "bold",
            fontSize: screens.xs ? 20 : 30,
            cursor: "pointer",
            padding: 0,
            display: "flex",
            alignItems: "center",
            height: "100%",
          }}
          onClick={() => navigate("/")}
        >
          <Image src={logo1} preview={false} />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: ".8rem",
          }}
        >
          <Button
            size="medium"
            style={{
              border: "1px solid #04befe",
            }}
            onClick={() => navigate("/login")}
          >
            Log in
          </Button>
        </div>
      </Header>
      <FloatButton
        icon={<PlusOutlined color="#fff" />}
        tooltip={<div>Upload Image</div>}
        type="default"
        style={{
          insetInlineEnd: screens.lg
            ? 94
            : screens.md
            ? 24
            : screens.sm
            ? 24
            : screens.xs
            ? 12
            : 12,
        }}
        className="custom-float-button"
        onClick={() => {
          handleUploadImage();
        }}
      />
      <Content
        style={{
          padding: screens.xs ? "0 8px" : "0 48px",
          height: "100vh",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: {
              xs: "column",
              sm: "row",
              md: "row",
            },
          }}
        >
          {!location?.state?.from_upload_image && (
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
          )}
          {location?.state?.from_upload_image && (
            <div
              style={{
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              <Button onClick={() => navigate(-1)}>
                <LeftOutlined />
              </Button>
            </div>
          )}
        </div>
        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,

            marginTop: location?.state?.from_upload_image ? 10 : 0,
            marginBottom: location?.state?.from_upload_image ? 10 : 0,
          }}
        >
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
};

export default MainLayout;
