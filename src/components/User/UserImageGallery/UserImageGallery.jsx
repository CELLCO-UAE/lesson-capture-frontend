import { LoadingOutlined } from "@ant-design/icons";
import { Empty, Image, Typography } from "antd";
import Cookies from "js-cookie";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useLocation } from "react-router-dom";
import { useLazyGetImageGalleryDataQuery } from "../../../redux/features/imageGallerySlice/imageGalleryApiSlice";
import { setImageGalleryData } from "../../../redux/features/imageGallerySlice/imageGallerySlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import ImageCard from "../../ImageCard/ImageCard";

import "./UserImageGallery.css";

const { Title } = Typography;

const UserImageGallery = () => {
  const [loading, setLoading] = useState(false); // manage loading state
  const [page, setPage] = useState(1);
  const observer = useRef();
  const dispatch = useAppDispatch();
  const [hasMore, setHasMore] = useState(true);
  const location = useLocation();
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;

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
    console.log("outside");

    setLoading(true);
    const totalPages = Math.ceil(imageGalleryCount / 10);
    console.log("Total Pages:", totalPages);

    if (page <= totalPages) {
      const response = await getImageGalleryData({
        page: page,
        page_size: 10,
      });

      if (response.data) {
        const newResults = response.data.results;
        console.log(`New Results for Page ${page}:`, newResults);

        if (!newResults || newResults.length === 0) {
          console.log(`No data returned for Page ${page}`);
          setLoading(false);
          return;
        }

        const galleryMap = new Map(
          imageGalleryData.map((item) => [item.id, item])
        );

        newResults.forEach((item) => {
          galleryMap.set(item.id, item);
        });

        const updatedGalleryData = Array.from(galleryMap.values());

        dispatch(setImageGalleryData(updatedGalleryData));

        setHasMore(page < totalPages);
      }
    }

    setLoading(false);
  }, [page, getImageGalleryData, dispatch, imageGalleryCount]);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, hasMore, loading]);

  useEffect(() => {
    fetchGalleryData();
  }, [fetchGalleryData, page, imageData]);

  return (
    <>
      {imageGalleryData?.length > 0 ? (
        <div className="image-gallery">
          <Image.PreviewGroup
          // preview={{
          //   onChange: (current, prev) =>
          //     console.log(`current index: ${current}, prev index: ${prev}`),
          // }}
          >
            {imageGalleryData?.map((item, index) => {
              const isLastImage = imageGalleryData.length === index + 1;
              return (
                <div ref={isLastImage ? ref : null} key={index}>
                  <ImageCard
                    src={item.image}
                    alt={`Image ${index}`}
                    data={item}
                    page={page}
                  />
                </div>
              );
            })}
          </Image.PreviewGroup>
        </div>
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No Images Found"
        />
      )}
      {loading && (
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

export default UserImageGallery;
