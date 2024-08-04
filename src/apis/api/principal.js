import instance from "../utils/instance"

export const getAdminPrincipalRequest = async (token) => {
    const response = await instance.get("/account/principal", {
        headers: {
            Authorization: token
        }
    });
    return response.data;
}

export const getUserPrincipalRequest = async (token) => {
    const response = await instance.get("/account/user/principal", {
        headers: {
            Authorization: token
        }
    });
    return response.data;
}
