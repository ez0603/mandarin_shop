import instance from "../utils/instance";

export const signinRequest = async (data) => {
    console.log("signinRequest data:", data); // 추가된 로그
    const response = await instance.post("/user/signin", data);
    console.log("signinRequest response:", response); // 추가된 로그
    return response;
  };