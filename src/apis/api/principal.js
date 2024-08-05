import instance from "../utils/instance"

export const getAdminPrincipalRequest = async () => {
    return await instance.get("/account/principal");
}

export const getUserPrincipalRequest = async () => {
    return await instance.get("/account/user/principal");
}
