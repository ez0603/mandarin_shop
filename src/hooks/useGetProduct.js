import { useState, useEffect } from 'react';
import { getProductCategoryRequest } from '../apis/api/product';

const useGetProducts = (categoryId) => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await getProductCategoryRequest(categoryId);
                setProducts(response.data);
            } catch (error) {
                console.log("에러", error);
                setError(error);
            }
        };

        if (categoryId) {
            getProducts();
        }
    }, [categoryId]);

    return { products, error };
};

export default useGetProducts;
