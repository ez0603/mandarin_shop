import { useState, useEffect } from 'react';
import { getProductDetailRequest } from '../apis/api/product';

const useGetProducts = (productId) => {
    const [productDetail, setProductDetail] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getProductDetail = async () => {
            try {
                const response = await getProductDetailRequest(productId);
                setProductDetail(response.data);
            } catch (error) {
                console.log("에러", error);
                setError(error);
            }
        };

        if (productId) {
            getProductDetail();
        }
    }, [productId]);

    return { productDetail, error };
};

export default useGetProducts;
