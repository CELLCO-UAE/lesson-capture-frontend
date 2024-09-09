import React from "react";
import CategoryList from "../components/Admin/CategoryList/CategoryList";
import CreateCategory from "../components/Admin/CreateCategory/CreateCategory";
import UploadImageForm from "../components/UploadImageForm/UploadImageForm";
import UserImageGallery from "../components/User/UserImageGallery/UserImageGallery";
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
    // {
    //   path: "/",
    //   element: <ImageGallery />,
    // },
    {
      path: "/",
      element: <UserImageGallery />,
    },
    {
      path: "/upload_image",
      element: <UploadImageForm />,
    },
    {
      path: "/category_list",
      element: <CategoryList />,
    },
    {
      path: "/create_category",
      element: <CreateCategory />,
    },
  ],
};

export default MainRoutes;
