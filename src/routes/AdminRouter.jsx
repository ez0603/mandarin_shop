import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProductPage from '../pages/AdminPage/ProductPage/ProductPage';

function AdminRouter(props) {
	return (
		<Routes>
			  <Route path="/product" element={<ProductPage />} />
		</Routes>
	);
}

export default AdminRouter;