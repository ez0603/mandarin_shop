/** @jsxImportSource @emotion/react */
// import * as s from "./style";
import { Route, Routes } from "react-router-dom";
import AdminHomePage from "../pages/AdminPage/AdminHomePage/AdminHomePage";
import SalesPage from "../pages/AdminPage/SalesPage/SalesPage";
import ProductRouter from "./ProductRouter";
import Sidebar from "../components/PageComponents/Sidebar/Sidebar";
import AdminPageLayout from "../components/PageComponents/AdminPageLayout/AdminPageLayout";

function AdminRouter(props) {
  return (
    <AdminPageLayout>
      <Sidebar />
      <Routes>
        <Route path="/home" element={<AdminHomePage />} />
        <Route path="/product/*" element={<ProductRouter />} />
        <Route path="/sales" element={<SalesPage />} />
      </Routes>
    </AdminPageLayout>
  );
}

export default AdminRouter;
