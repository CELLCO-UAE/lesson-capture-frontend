import { LoadingOutlined } from "@ant-design/icons";
import { Empty, Image } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useLazyGetImageGalleryDataQuery } from "../../redux/features/imageGallerySlice/imageGalleryApiSlice";
import {
  setImageGalleryCount,
  setImageGalleryData,
} from "../../redux/features/imageGallerySlice/imageGallerySlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ImageCard from "../ImageCard/ImageCard";
import "./ImageGallery.css";

const ImageGallery = () => {
  const [loading, setLoading] = useState(false); // manage loading state
  const [page, setPage] = useState(1);
  const observer = useRef();
  const dispatch = useAppDispatch();
  const [hasMore, setHasMore] = useState(true);

  const { ref, inView } = useInView({
    threshold: 1,
  });

  const { imageGalleryData, imageGalleryCount } = useAppSelector(
    (state) => state.imageGalleryReducer
  );

  // // -------------- get api -----------------------
  // const { data: imageGalleryAllData, isFetching } = useGetImageGalleryDataQuery(
  //   {
  //     page: page,
  //   },
  //   {
  //     refetchOnArgsChange: true,
  //   }
  // );

  const [getImageGalleryData, { data: imageData }] =
    useLazyGetImageGalleryDataQuery();

  const fetchGalleryData = useCallback(async () => {
    setLoading(true);
    if (imageGalleryData?.length !== imageGalleryCount) {
      const response = await getImageGalleryData({
        page: page,
        page_size: 10,
      });
      if (response.data) {
        setLoading(false);
        dispatch(
          setImageGalleryData([...imageGalleryData, ...response.data.results])
        );
        setHasMore(response.data.results.length > 0);
        dispatch(setImageGalleryCount(response.data.count));
      }
    }
  }, [page, getImageGalleryData]);

  useEffect(() => {
    fetchGalleryData();
  }, [fetchGalleryData, dispatch]);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, hasMore, loading]);

  return (
    <>
      {imageGalleryData?.length > 0 ? (
        <div className="image-gallery">
          <Image.PreviewGroup
            preview={{
              onChange: (current, prev) =>
                console.log(`current index: ${current}, prev index: ${prev}`),
            }}
          >
            {imageGalleryData?.map((item, index) => (
              <div ref={ref} key={index}>
                <ImageCard
                  src={item.image}
                  alt={`Image ${index}`}
                  data={item}
                />
              </div>
            ))}
          </Image.PreviewGroup>
        </div>
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No Images Found"
        />
      )}
      {loading && imageGalleryData?.length !== imageGalleryCount && (
        <LoadingOutlined
          style={{
            fontSize: "50px",
            display: "flex",
            justifyContent: "center",
            color: "#04befe",
          }}
        />
      )}
    </>
  );
};

export default ImageGallery;
