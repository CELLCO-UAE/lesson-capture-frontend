import { Card, Image, Typography } from "antd";
import React from "react";

const { Meta } = Card;
const { Title } = Typography;

const ImageCard = ({ src, alt, data }) => {
  return (
    <Card
      style={{
        padding: "5px 5px 0",
      }}
    >
      <Image
        width={"100%"}
        height={"250px"}
        src={src} // Assuming your MOCK_DATA has imageUrl
        alt={alt}
        style={{
          borderRadius: 5,
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
        <Title
          level={5}
          style={{
            margin: "10px 5px",
          }}
        >
          {data?.name}
        </Title>
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
            {data?.uploaded_by}
          </Title>
        </div>
      </div>
    </Card>
  );
};

export default ImageCard;
