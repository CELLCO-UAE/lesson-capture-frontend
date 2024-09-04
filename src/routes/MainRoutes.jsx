import React from "react";
import ImageGallery from "../components/ImageGallery/ImageGallery";
import UploadImageForm from "../components/UploadImageForm/UploadImageForm";
import MainLayout from "../layout/MainLayout";

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <ImageGallery />,
    },
    {
      path: "/upload_image",
      element: <UploadImageForm />,
    },
  ],
};

export default MainRoutes;
