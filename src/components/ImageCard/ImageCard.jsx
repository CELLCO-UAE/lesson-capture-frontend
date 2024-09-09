import { Card, Image, Tooltip, Typography } from "antd";
import React, { useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { useDeleteImageGalleryDataMutation } from "../../redux/features/imageGallerySlice/imageGalleryApiSlice";
import { ConfirmationNotify, Notify } from "../../utilities/toast/toast";
const { Meta } = Card;
const { Title } = Typography;

const ImageCard = ({ src, alt, data }) => {
  const location = useLocation();

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

  return (
    <Card
      style={
        {
          // padding: "5px 5px 0",
        }
      }
    >
      <Image
        width={"100%"}
        height={"250px"}
        src={src} // Assuming your MOCK_DATA has imageUrl
        alt={alt}
        style={{
          borderRadius: "5px 5px 0 0",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
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
            {data?.category_name}
          </Title>
          <Title
            level={5}
            style={{
              margin: "0 5px 15px",
              fontWeight: "bold",
            }}
          >
            {data?.title}
          </Title>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
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
            level={5}
            style={{
              margin: "0 5px 15px",
              fontWeight: "bold",
            }}
          >
            {data?.user_fullname}
          </Title>
        </div>
      </div>
      {location.state?.from_my_images && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: ".5rem",
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
      )}
    </Card>
  );
};

export default ImageCard;
