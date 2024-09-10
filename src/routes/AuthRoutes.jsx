import LoginForm from "../components/Auth/LoginForm";
import RegisterForm from "../components/Auth/RegisterForm";

const AuthRoutes = {
  path: "/",
  //   element: <MainLayout />,
  children: [
    {
      path: "/register",
      element: <RegisterForm />,
    },
    {
      path: "/login",
      element: <LoginForm />,
    },
  ],
};

export default AuthRoutes;
