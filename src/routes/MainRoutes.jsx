import React from "react";
import CreateCategory from "../components/CreateCategory/CreateCategory";
import ImageGallery from "../components/ImageGallery/ImageGallery";
import UploadImageForm from "../components/UploadImageForm/UploadImageForm";
import MainLayout from "../layout/MainLayout";
import AuthRedirect from "../utilities/AuthRedirect/AuthRedirect";

const MainRoutes = {
  path: "/",
  element: (
    <AuthRedirect>
      <MainLayout />
    </AuthRedirect>
  ),
  children: [
    {
      path: "/",
      element: <ImageGallery />,
    },
    {
      path: "/upload_image",
      element: <UploadImageForm />,
    },
    {
      path: "/create_category",
      element: <CreateCategory />,
    },
  ],
};

export default MainRoutes;
