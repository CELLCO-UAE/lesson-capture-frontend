import { Image } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { MOCK_DATA } from "../../assets/MOCK_DATA";
import { useGetImageGalleryDataQuery } from "../../redux/features/imageGallerySlice/imageGalleryApiSlice";
import { setImageGalleryData } from "../../redux/features/imageGallerySlice/imageGallerySlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ImageCard from "../ImageCard/ImageCard";
import "./ImageGallery.css";

const ImageGallery = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const observer = useRef();
  const dispatch = useAppDispatch();

  const { imageGalleryData } = useAppSelector(
    (state) => state.imageGalleryReducer
  );

  // -------------- get api -----------------------
  const { data: imageGalleryAllData } = useGetImageGalleryDataQuery(
    {
      page: page,
    },
    {
      refetchOnArgsChange: true,
    }
  );

  useEffect(() => {
    dispatch(setImageGalleryData(imageGalleryAllData));
  }, [dispatch, imageGalleryAllData]);

  const lastPostElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1); // trigger loading of new posts by chaging page no
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading]
  );
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
              ref={MOCK_DATA.length === index + 1 ? lastPostElementRef : null}
            />
          </div>
        ))}
      </Image.PreviewGroup>
    </div>
  );
};

export default ImageGallery;
