import instance from "../utils/instance";

export const searchAllCategoryRequest = async () => {
	return await instance.get("/product/category");
  };

export const registerCategory = async (data) => {
	return await instance.post("/product/category", data);
  };

