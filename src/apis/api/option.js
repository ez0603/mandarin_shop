import instance from "../utils/instance";

export const getProductOption = async (productId) => {
  return await instance.get(`/product/option?productId=${productId}`);
};

export const getProductOptionTitle = async (productId) => {
  return await instance.get(`/product/option/title?productId=${productId}`);
};

export const registerOptionTitle = async (data) => {
  return await instance.post("/product/option/title", data);
};

export const registerOption = async (data) => {
  return await instance.post("/product/option/name", data);
};

export const updateProductOption = async (data) => {
  return await instance.put("product/option", data);
};

export const updateProductTitleOption = async (data) => {
  return await instance.put("/product/option/title", data);
};

export const deleteOptionTitle = async (data) => {
    return await instance.delete("product/option/title", { data: data });
};

export const deleteOption = async (data) => {
  return await instance.delete("product/option/name", { data: data });
};
