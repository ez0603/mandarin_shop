import instance from "../utils/instance"

export const adminSignupRequest = async (data) => {
    try {
        const response = instance.post("/user/signup", data);
        return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
}