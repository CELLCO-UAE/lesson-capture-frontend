import Cookies from "js-cookie";
import { useEffect, useMemo } from "react";

import { useLocation, useNavigate } from "react-router-dom";

const AuthRedirect = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathNames = useMemo(() => ["upload_image", "create_category"], []);

  const protectPath = pathNames.some((path) =>
    location?.pathname.includes(path)
  );

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (protectPath && !token) {
      navigate("/login");
    }
  }, [navigate, location?.pathname, protectPath]);
  return children;
};

export default AuthRedirect;
