import instance from "../utils/instance"

export const searchUsernameByEmailRequest = async (data) => {
    return await instance.post("/mail/send/id", data);
}

export const searchPasswordByEmailRequest = async (data) => {
    return await instance.post("/mail/send/temporary/password", data);
}

export const searchAdminnameByEmailRequest = async (data) => {
    return await instance.post("/mail/send/admin/id", data);
}

export const searchAdminPasswordByEmailRequest = async (data) => {
    return await instance.post("/mail/send/temporary/admin/password", data);
}