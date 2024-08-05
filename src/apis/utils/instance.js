import axios from "axios";
import getServerAddress from "../../constants/serverAddress";

const instance = axios.create({
    baseURL: getServerAddress(),
});

// 요청 인터셉터 추가
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("AccessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const portOneInstance = axios.create({
    baseURL: "https://api.portone.io",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

export default instance;
