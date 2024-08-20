/** @jsxImportSource @emotion/react */
import { Route, Routes } from 'react-router-dom';
import ProductPage from '../pages/AdminPage/ProductPage/ProductPage';
import EditProductPage from '../pages/AdminPage/EditProductPage/EditProductPage';
import ProductAddPage from '../pages/AdminPage/ProductAddPage/ProductAddPage';

function ProductRouter(props) {
	return (
		<Routes>
			  <Route path="/" element={<ProductPage />} />
			  <Route path="/add" element={<ProductAddPage />} />
			  <Route path="/edit/:productId" element={<EditProductPage />} />
		</Routes>
	);
}

export default ProductRouter;