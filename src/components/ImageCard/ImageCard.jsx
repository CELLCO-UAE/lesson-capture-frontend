import { EyeOutlined } from "@ant-design/icons";
import { Card, Image, Tooltip, Typography } from "antd";
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { useDeleteImageGalleryDataMutation } from "../../redux/features/imageGallerySlice/imageGalleryApiSlice";
import { ConfirmationNotify, Notify } from "../../utilities/toast/toast";
const { Meta } = Card;
const { Title } = Typography;

const ImageCard = ({ src, alt, data, page }) => {
  const location = useLocation();
  const userDetails = Cookies.get("user")
    ? JSON.parse(Cookies.get("user"))
    : null;

  // -----------delete api---------------
  const [deleteImageGalleryData, { isSuccess, isError }] =
    useDeleteImageGalleryDataMutation();

  const handleDelete = async (id) => {
    const response = await ConfirmationNotify({
      title: "Are your sure?",
      text: "Please confirm if you want to delete this image.",
    });
    if (response.isConfirmed) {
      await deleteImageGalleryData(id);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      Notify({ message: "Image is deleted successfully!" });
    }
    if (isError) {
      Notify({
        icon: "error",
        message: "Failed!",
      });
    }
  }, [isSuccess, isError]);

  const truncatedText = (text, type) => {
    let characterLimit;
    if (type === "category") {
      characterLimit = 8;
    }
    if (type === "title") {
      characterLimit = 14;
    }
    const updatedText =
      text?.length >= characterLimit
        ? text.substring(0, characterLimit) + "..."
        : text;

    return updatedText;
  };

  return (
    <Card
      style={{
        position: "relative",
        // padding: "5px 5px 0",
      }}
    >
      <Image
        width={"100%"}
        height={"250px"}
        src={src}
        alt={alt}
        style={{
          borderRadius: "5px 5px 0 0",
          objectFit: "cover",
          objectPosition: "center",
          overflow: "hidden",
        }}
        preview={{
          mask: (
            <div style={{ color: "#fff" }}>
              {/* Delete Button */}
              <div
                style={{
                  display: "flex",
                  padding: ".5rem",
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                }}
                onClick={(e) => {
                  e.stopPropagation(); // Prevents triggering the image preview
                  handleDelete(data?.id); // Calls delete function
                }}
              >
                <Tooltip title="Delete">
                  <MdDeleteOutline
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      color: "red",
                      cursor: "pointer",
                    }}
                  />
                </Tooltip>
              </div>

              {/* Click to Preview Text */}
              <div>
                <EyeOutlined
                  style={{
                    color: "#fff",
                    marginRight: "3px",
                  }}
                />
                Preview
              </div>

              {/* User Information */}
              {userDetails?.role === "admin" && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    position: "absolute",
                    bottom: "10px",
                    left: "10px",
                  }}
                >
                  <Title
                    level={5}
                    style={{
                      margin: "15px 5px 0",
                      color: "gray",
                      fontSize: "11px",
                    }}
                  >
                    Uploaded by
                  </Title>
                  <Title
                    style={{
                      margin: "0 5px",
                      fontWeight: "bold",
                      color: "#FFF",
                      fontSize: "14px",
                    }}
                  >
                    {data?.user_fullname}
                  </Title>
                </div>
              )}
            </div>
          ), // Custom preview mask
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          // justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Tooltip
            title={data?.category_name?.length >= 7 ? data?.category_name : ""}
          >
            <Title
              level={5}
              style={{
                // margin: "15px 5px 0",
                padding: "0 5px",
                // color: "gray",
                fontSize: "11px",
              }}
            >
              {truncatedText(data?.category_name, "category")}
            </Title>
          </Tooltip>
          <Tooltip title={data?.title?.length >= 12 ? data?.title : ""}>
            <Title
              level={5}
              style={{
                // margin: "0 5px 15px",
                padding: "0 5px",
                fontWeight: "bold",
              }}
              ellipsis={{
                width: "7px",
              }}
            >
              {truncatedText(data?.title, "title")}
            </Title>
          </Tooltip>
        </div>
        {/* <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            bottom: "60px",
            left: "10px",
          }}
        >
          <Title
            level={5}
            style={{
              margin: "15px 5px 0",
              color: "gray",
              fontSize: "11px",
            }}
          >
            Uploaded by
          </Title>
          <Title
            // level={5}
            style={{
              margin: "0 5px 15px",
              fontWeight: "bold",
              color: "#FFF",
              fontSize: "14px",
            }}
          >
            {data?.user_fullname}
          </Title>
        </div> */}
      </div>

      {/* {isHover && (
        <div
          style={{
            display: "flex",
            // flexDirection: "column",
            // justifyContent: "flex-end",
            padding: ".5rem",
            position: "absolute",
            top: "10px",
            right: "10px",
          }}
        >
          <Tooltip title="Delete">
            <MdDeleteOutline
              style={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: "red",
                cursor: "pointer",
              }}
              onClick={() => handleDelete(data?.id)}
            />
          </Tooltip>
        </div>
      )} */}
    </Card>
  );
};

export default ImageCard;
