import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { AuthContext } from "../context/AuthContext";

function PrivateRouting({ allowedRole }) {

  const { auth } = useContext(AuthContext);
  const location = useLocation();

  if (auth.roleName.toLowerCase() === 'guest') {
    return (
      <Navigate to="/login" state={{ from: location }} replace />
    );

  } else {
    let checkPermission = false;
    allowedRole.forEach((item) => {
      if (auth.roleName.toLowerCase() === item.toLowerCase()) {
        checkPermission = true
      }
    })

    if (checkPermission == true) {
      return (
        <Outlet />
      )
    } else {
      // Đưa đến trang lỗi

    }
  }
}

export default PrivateRouting;