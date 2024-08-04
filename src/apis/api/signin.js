import instance from "../utils/instance"

export const signinRequest = async (data) => {
    const response = await instance.post("/user/signin", data);
    return response;
}