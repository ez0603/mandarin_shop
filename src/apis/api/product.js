import instance from "../utils/instance";

export const registerProductRequest = async () => {
  return await instance.post("/product/products");
};

export const getProductRequest = async () => {
  return await instance.get("/product/products");
};

export const getProductCategoryRequest = async (categoryId) => {
  return await instance.get(
    `/product/products/category?categoryId=${categoryId}`
  );
};

export const getProductDetailRequest = async (productId) => {
  return await instance.get(`/product/detail?productId=${productId}`);
};

export const deleteProductRequest = async (productId) => {
  return await instance.delete(`/product/products?productId=${productId}`);
};

export const updateProduct = async (data) => {
  return await instance.put("/product/products", data);
};
