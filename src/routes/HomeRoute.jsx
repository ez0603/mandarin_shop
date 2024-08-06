import { Navigate, Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useQuery } from "react-query";
import { authState } from "../atoms/authAtom";
import AdminRouter from "./AdminRouter";
import UserRouter from "./UserRouter";
import HomePage from "../pages/HomePage/HomePage";
import PageLayout from "../components/PageComponents/PageLayout/PageLayout";
import AuthRoute from "./AuthRoute";
import {
  getAdminPrincipalRequest,
  getUserPrincipalRequest,
} from "../apis/api/principal";
import instance from "../apis/utils/instance";
import { useEffect } from "react";

function HomeRoute(props) {
  const auth = useRecoilValue(authState);
  const { principal } = auth;

  useEffect(() => {
    const token = localStorage.getItem("AccessToken");
    if (token) {
      instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  const { data: adminData, isLoading: adminLoading } = useQuery(
    "adminPrincipal",
    getAdminPrincipalRequest,
    {
      enabled: principal?.roleId === 1,
      retry: false,
    }
  );

  const { data: userData, isLoading: userLoading } = useQuery(
    "userPrincipal",
    getUserPrincipalRequest,
    {
      enabled: principal?.roleId === 2,
      retry: false,
    }
  );

  if (!principal) {
    return (
      <PageLayout>
        <Routes>
          <Route path="/auth/*" element={<AuthRoute />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </PageLayout>
    );
  }

  if (adminLoading || userLoading) {
    return <div>Loading...</div>;
  }

  if (
    (principal.roleId === 1 && !adminData) ||
    (principal.roleId === 2 && !userData)
  ) {
    return <Navigate to="/" />;
  }

  return (
    <PageLayout>
      <Routes>
        {principal.roleId === 1 ? (
          <Route path="/admin/*" element={<AdminRouter />} />
        ) : principal.roleId === 2 ? (
          <Route path="/user/*" element={<UserRouter />} />
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
    </PageLayout>
  );
}

export default HomeRoute;
