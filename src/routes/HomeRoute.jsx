import { Navigate, Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../atoms/authAtom";
import AdminRouter from "./AdminRouter";
import UserRouter from "./UserRouter";
import HomePage from "../pages/HomePage/HomePage";
import Header from "../components/PageComponents/Header/Header";
import PageLayout from "../components/PageComponents/PageLayout/PageLayout";
import AuthRoute from "./AuthRoute";

function HomeRoute(props) {
  const auth = useRecoilValue(authState);
  const { principal } = auth;

  if (!principal) {
    return (
      <PageLayout>
        <Header />
        <Routes>
          <Route path="/auth/*" element={<AuthRoute />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </PageLayout>
    );
  }
  console.log(principal);

  return (
    <Routes>
      {principal.role_id === 2 ? (
        <Route path="/*" element={<AdminRouter />} />
      ) : (
        <Route path="/*" element={<UserRouter />} />
      )}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default HomeRoute;
