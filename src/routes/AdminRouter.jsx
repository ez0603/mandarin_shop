/** @jsxImportSource @emotion/react */
// import * as s from "./style";
import { Route, Routes } from 'react-router-dom';
import ProductPage from '../pages/AdminPage/ProductPage/ProductPage';
import AdminHomePage from '../pages/AdminPage/AdminHomePage/AdminHomePage';
import SalesPage from '../pages/AdminPage/SalesPage/SalesPage';

function AdminRouter(props) {
	return (
		<Routes>
			  <Route path="/home" element={<AdminHomePage />} />
			  <Route path="/product" element={<ProductPage />} />
			  <Route path="/sales" element={<SalesPage />} />
		</Routes>
	);
}

export default AdminRouter;