import Cookies from "js-cookie";
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

const AuthRedirect = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
  return children;
};

export default AuthRedirect;
