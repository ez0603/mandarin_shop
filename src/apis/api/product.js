import instance from "../utils/instance"

export const getProductRequest = async () => {
    return await instance.get("/product/products");
}

export const getProductCategoryRequest = async (categoryId) => {
    return await instance.get(`/product/products/category?categoryId=${categoryId}`);
}


export const getProductDetailRequest = async (productId) => {
    return await instance.get(`/product/detail?productId=${productId}`);
}

export const updateProductRequest = async (data) => {
    return await instance.put("/product/products", data);
};


