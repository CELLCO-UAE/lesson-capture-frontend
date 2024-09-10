import {
  FolderAddOutlined,
  LeftOutlined,
  LogoutOutlined,
  MoreOutlined,
  PlusOutlined,
  ReloadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Dropdown,
  FloatButton,
  Grid,
  Image,
  Layout,
  Menu,
  Modal,
  Select,
  theme,
  Tooltip,
} from "antd";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { IoFilterOutline } from "react-icons/io5";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import logo1 from "../assets/scanmate.svg";
import {
  useGetUserInfosQuery,
  usePostLogoutCredentialsMutation,
} from "../redux/features/authSlice/authApiSlice";
import { useLazyGetCategoriesNamesQuery } from "../redux/features/categorySlice/categoryApiSlice";
import { useLazyGetUserNamesQuery } from "../redux/features/globalSlice/globalApiSlice";
import { useLazyGetImageGalleryDataQuery } from "../redux/features/imageGallerySlice/imageGalleryApiSlice";
import {
  setImageGalleryCount,
  setImageGalleryData,
} from "../redux/features/imageGallerySlice/imageGallerySlice";
import { useAppDispatch } from "../redux/hooks";
import { Notify } from "../utilities/toast/toast";
import "./MainLayout.css";

const { useBreakpoint } = Grid;

const { Header, Content } = Layout;

const MainLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [selectedItem, setSelectedItem] = useState("Date Range");
  const [selectedCategory, setSelectedCategory] = useState("Select a category");
  const [uploadedBy, setUploadedBy] = useState("Uploaded By");
  const screens = useBreakpoint();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const token = Cookies.get("authToken");

  const { data: userDetails, isSuccess: isUserDetailsSuccess } =
    useGetUserInfosQuery(undefined, {
      refetchOnMountOrArgChange: true,
    });
  const [getCategoriesNames, { data: categoryNameList }] =
    useLazyGetCategoriesNamesQuery();
  const [getUserNames, { data: userNamesList }] = useLazyGetUserNamesQuery();
  const [getImageGalleryData, { data: imageGalleryData, isSuccess }] =
    useLazyGetImageGalleryDataQuery();
  const [postLogoutCredentials, { isSuccess: isLogoutSuccess }] =
    usePostLogoutCredentialsMutation();

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

  useEffect(() => {
    if (isUserDetailsSuccess) {
      Cookies.set("user", JSON.stringify(userDetails), { expires: 7 });
    }
  }, [userDetails, isUserDetailsSuccess]);

  useEffect(() => {
    if (selectedItem || selectedCategory || uploadedBy) {
      getImageGalleryData({
        ...(uploadedBy !== "Uploaded By" && {
          user: uploadedBy,
        }),
        ...(selectedCategory !== "Select a category" && {
          category: selectedCategory,
        }),
        ...(selectedItem !== "Date Range" &&
          selectedItem !== "all" && {
            date_range: selectedItem,
          }),
        page: page,
        page_size: 10,
      });
    }
  }, [
    getImageGalleryData,
    uploadedBy,
    selectedCategory,
    selectedItem,
    dispatch,
    page,
  ]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setImageGalleryData(imageGalleryData?.results));
      dispatch(setImageGalleryCount(imageGalleryData?.count));
    }
  }, [dispatch, imageGalleryData?.results, imageGalleryData?.count, isSuccess]);

  const handleReset = async () => {
    await getImageGalleryData({
      page: 1,
      page_size: 10,
    });
    setUploadedBy("Uploaded By");
    setSelectedCategory("Select a category");
    setSelectedItem("Date Range");
  };

  const handleLogout = async () => {
    const response = await postLogoutCredentials();
  };

  useEffect(() => {
    if (isLogoutSuccess) {
      Cookies.remove("authToken"), navigate("/");
      Cookies.remove("user"), navigate("/");
      navigate("/login");
      Notify({
        icon: "success",
        message: "You have been logged out successfully!",
      });
    }
  }, [isLogoutSuccess, navigate]);

  const menu = (
    <Menu>
      {screens.xs && token && (
        <Menu.Item
          key="4"
          icon={<FolderAddOutlined />}
          onClick={() =>
            navigate("/category_list", {
              state: {
                from_create_category: true,
              },
            })
          }
        >
          Category List
        </Menu.Item>
      )}
      {/* {token && (
        <Menu.Item key="1" icon={<UserOutlined />}>
          Profile
        </Menu.Item>
      )}
      {token && (
        <Menu.Item key="2" icon={<SettingOutlined />}>
          Settings
        </Menu.Item>
      )} */}
      {token && (
        <Menu.Item
          key="3"
          icon={<LogoutOutlined />}
          onClick={() => handleLogout()}
        >
          Logout
        </Menu.Item>
      )}
      {!token && (
        <Menu.Item
          key="3"
          icon={<LogoutOutlined />}
          onClick={() => {
            navigate("/login");
          }}
        >
          Log in
        </Menu.Item>
      )}
    </Menu>
  );

  const AvatarMenu = () => (
    <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
      <Avatar style={{ backgroundColor: "#87d068" }} icon={<UserOutlined />} />
    </Dropdown>
  );

  const handleChangeDateRange = (value) => {
    setSelectedItem(value);
  };
  const handleChange = (value) => {
    setSelectedCategory(value);
  };
  const handleChangeUploadedBy = (value) => {
    setUploadedBy(value);
  };

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
          height: "100px",
          // background: "#fff",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: screens.xs ? "0 8px" : "0 50px",
          background: "linear-gradient(145deg, #84D6EE, #10BCE4)",
        }}
        className="header-image"
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
          <Image
            src={logo1}
            preview={false}
            style={{
              width: "20",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: ".8rem",
          }}
        >
          {!screens.xs && token && (
            <Button
              size="medium"
              style={{
                border: "none",
              }}
              onClick={() =>
                navigate("/category_list", {
                  state: {
                    from_create_category: true,
                  },
                })
              }
            >
              Category List
            </Button>
          )}
          {!token && !screens.xs && (
            <Button
              size="medium"
              type="primary"
              style={{
                // border: "1px solid #04befe",
                background: "linear-gradient(135deg, #04befe, #6253e1)",
              }}
              onClick={() => navigate("/login")}
            >
              Log in
            </Button>
          )}
          {token && (
            <Dropdown
              overlay={menu}
              trigger={["click"]}
              placement="bottomRight"
            >
              <Avatar
                size={40}
                style={{
                  background: "#FFC5C4",
                  verticalAlign: "middle",
                  color: "#000",
                  cursor: "pointer",
                  border: "2px solid #fff",
                  padding: 1,
                  fontWeight: "bold",
                }}
              >
                {userDetails?.first_name
                  ? userDetails?.first_name?.charAt(0)?.toUpperCase()
                  : userDetails?.role === "admin"
                  ? "Admin"
                  : "User"}
              </Avatar>
            </Dropdown>
          )}
          {!token && screens.xs && (
            <Dropdown
              overlay={menu}
              trigger={["click"]}
              placement="bottomRight"
            >
              <MoreOutlined
                style={{
                  fontSize: 20,
                }}
              />
            </Dropdown>
          )}
        </div>
      </Header>
      <FloatButton
        icon={<PlusOutlined color="#fff" />}
        tooltip={<div>Upload Image</div>}
        type="default"
        style={{
          insetInlineEnd: screens.lg
            ? 44
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
          background: "#FFF",
          // background: "#FFC5C4",
        }}
      >
        {screens.xs &&
          !location?.state?.from_upload_image &&
          !location?.state?.from_create_category && (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <IoFilterOutline
                style={{
                  margin: "10px 0",
                  fontSize: 25,
                }}
                onClick={showModal}
              />
            </div>
          )}
        {screens.xs &&
          (location?.state?.from_upload_image ||
            location?.state?.from_create_category) && (
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

        {!screens.xs && (
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
            {!location?.state?.from_upload_image &&
              !location?.state?.from_create_category && (
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
                    <Select
                      value={selectedItem}
                      style={{ width: 120 }}
                      onChange={(e) => handleChangeDateRange(e)}
                      options={dateRanges?.map((dateRange) => {
                        return {
                          label: dateRange.label,
                          value: dateRange.value,
                        };
                      })}
                    />
                  </div>
                  <div
                    style={{
                      marginTop: 10,
                      marginBottom: 10,
                    }}
                    onClick={() => getCategoriesNames()}
                  >
                    <Select
                      value={selectedCategory}
                      style={{ width: 120 }}
                      onChange={(e) => handleChange(e)}
                      options={categoryNameList?.map((categoryName) => {
                        return {
                          label: categoryName.name,
                          value: categoryName.id,
                        };
                      })}
                    />
                  </div>
                  {userDetails?.role === "admin" && (
                    <div
                      style={{
                        marginTop: 10,
                        marginBottom: 10,
                      }}
                      onClick={() => getUserNames()}
                    >
                      <Select
                        value={uploadedBy}
                        style={{ width: 120 }}
                        onChange={(e) => handleChangeUploadedBy(e)}
                        options={userNamesList?.map((userName) => {
                          return {
                            label: userName.name,
                            value: userName.id,
                          };
                        })}
                      />
                    </div>
                  )}
                  {((selectedCategory &&
                    selectedCategory !== "Select a category") ||
                    (selectedItem && selectedItem !== "Date Range") ||
                    (uploadedBy && uploadedBy !== "Uploaded By")) && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Tooltip title="Reset">
                        <Button
                          shape="circle"
                          icon={<ReloadOutlined />}
                          danger
                          onClick={handleReset}
                        />
                      </Tooltip>
                    </div>
                  )}
                </div>
              )}
            {(location?.state?.from_upload_image ||
              location?.state?.from_create_category) && (
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
        )}
        <Modal
          title="Filters"
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <div
              style={{
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              <Select
                value={selectedItem}
                style={{ width: 120 }}
                onChange={(e) => handleChangeDateRange(e)}
                options={dateRanges?.map((dateRange) => {
                  return {
                    label: dateRange.label,
                    value: dateRange.value,
                  };
                })}
              />
            </div>
            <div
              style={{
                marginTop: 10,
                marginBottom: 10,
              }}
              onClick={() => getCategoriesNames()}
            >
              <Select
                value={selectedCategory}
                style={{ width: 120 }}
                onChange={(e) => handleChange(e)}
                options={categoryNameList?.map((categoryName) => {
                  return {
                    label: categoryName.name,
                    value: categoryName.id,
                  };
                })}
              />
            </div>
            <div
              style={{
                marginTop: 10,
                marginBottom: 10,
              }}
              onClick={() => getUserNames()}
            >
              <Select
                value={uploadedBy}
                style={{ width: 120 }}
                onChange={(e) => handleChangeUploadedBy(e)}
                options={userNamesList?.map((userName) => {
                  return {
                    label: userName.name,
                    value: userName.id,
                  };
                })}
              />
            </div>
            {((selectedCategory && selectedCategory !== "Select a category") ||
              (selectedItem && selectedItem !== "Date Range") ||
              (uploadedBy && uploadedBy !== "Uploaded By")) && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Tooltip title="Reset">
                  <Button
                    shape="circle"
                    icon={<ReloadOutlined />}
                    danger
                    onClick={handleReset}
                  />
                </Tooltip>
              </div>
            )}
          </div>
        </Modal>
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
