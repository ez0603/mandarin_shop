import instance from "../utils/instance";

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

export const updateProductRequest = async (data) => {
  return await instance.put("/product/products", data);
};

export const registerOptionTitle = async (data) => {
  return await instance.post("/product/option/title", data);
};

export const getProductOption = async (productId) => {
  return await instance.get(`/product/option?productId=${productId}`);
};

export const registerOption = async (data) => {
  return await instance.post("/product/option/name", data);
};

export const updateProductOptionRequest = async (data) => {
  return await instance.put("/product/option/title", data);
};

export const getProductTitleOption = async (productId) => {
  return await instance.get(`/product/option/title?productId=${productId}`);
};
