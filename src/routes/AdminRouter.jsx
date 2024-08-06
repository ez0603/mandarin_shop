/** @jsxImportSource @emotion/react */
// import * as s from "./style";
import { Route, Routes } from 'react-router-dom';
import ProductPage from '../pages/AdminPage/ProductPage/ProductPage';
import AdminHomePage from '../pages/AdminPage/AdminHomePage/AdminHomePage';
import SalesPage from '../pages/AdminPage/SalesPage/SalesPage';
import ProductRouter from './ProductRouter';

function AdminRouter(props) {
	return (
		<Routes>
			  <Route path="/home" element={<AdminHomePage />} />
			  <Route path="/product/*" element={<ProductRouter />} />
			  <Route path="/sales" element={<SalesPage />} />
		</Routes>
	);
}

export default AdminRouter;