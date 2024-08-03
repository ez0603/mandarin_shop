import instance from "../utils/instance";

export const searchAllCategoryRequest = async () => {
	return await instance.get("/product/category");
  };