import instance from "../utils/instance";

export const userSigninRequest = async (data) => {
  const response = await instance.post("/user/signin", data);
  return response;
};

export const adminSigninRequest = async (data) => {
  const response = await instance.post("/admin/auth/signin", data);
  return response;
};