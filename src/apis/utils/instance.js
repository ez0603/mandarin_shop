import axios from "axios";
import getServerAddress from "../../constants/serverAddress";

const instance = axios.create({
    baseURL: getServerAddress(),
    headers: {
        "Content-Type": "application/json",
    },
});

// 요청 인터셉터 추가
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("AccessToken");
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;
