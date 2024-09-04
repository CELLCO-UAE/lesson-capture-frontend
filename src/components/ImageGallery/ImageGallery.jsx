import { Image } from "antd";
import React from "react";
import { MOCK_DATA } from "../../assets/MOCK_DATA";
import ImageCard from "../ImageCard/ImageCard";
import "./ImageGallery.css";

const ImageGallery = () => {
  return (
    <div className="image-gallery">
      <Image.PreviewGroup
        preview={{
          onChange: (current, prev) =>
            console.log(`current index: ${current}, prev index: ${prev}`),
        }}
      >
        {MOCK_DATA.map((item, index) => (
          <div key={index}>
            <ImageCard
              //   width={200}
              src={item.imageUrl} // Assuming your MOCK_DATA has imageUrl
              alt={`Image ${index}`}
              data={item}
            />
          </div>
        ))}
      </Image.PreviewGroup>
    </div>
  );
};

export default ImageGallery;
