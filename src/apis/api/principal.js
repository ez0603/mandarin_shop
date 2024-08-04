
import instance from '../utils/instance';

export const getAdminPrincipalRequest = async (token) => {
    return await instance.get("/account/principal", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  
  export const getUserPrincipalRequest = async (token) => {
    return await instance.get("/account/user/principal", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };