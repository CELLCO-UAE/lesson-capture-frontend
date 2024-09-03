import React from "react";
import UploadImageForm from "../components/UploadImageForm/UploadImageForm";
import MainLayout from "../layout/MainLayout";

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <div>hellow</div>,
    },
    {
      path: "/upload_image",
      element: <UploadImageForm />,
    },
  ],
};

export default MainRoutes;
