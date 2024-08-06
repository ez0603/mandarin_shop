import instance from "../utils/instance"

export const getAdminPrincipalRequest = async () => {
    return await instance.get("/account/admin/principal");
}

export const getUserPrincipalRequest = async () => {
    return await instance.get("/account/user/principal");
}
