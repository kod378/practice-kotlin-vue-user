import axios from 'axios';
import router from "@/router";
import store from "@/store/index";

const apiServer = 'http://localhost:8080';

const axiosInstance = axios.create({
    baseURL: apiServer,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Axios 인터셉터를 사용해 401 에러 처리
axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        // 401 에러가 발생하고, 재시도 플래그가 없으며, 에러 응답이 2001일 때
        if (error.response.status === 401 && !originalRequest._retry && error.response.data.result.code === 2001) {
            originalRequest._retry = true;

            // AccessToken이 만료되었을 때 로그인 화면으로 리디렉션하며 query에 이유 전달
            await router.push({
                name: 'login',
                query: {message: 'token-expired'}
            });
        }
        return Promise.reject(error);
    }
);

// OPEN API 요청
export async function openApiRequest(url, method = 'GET', data = null) {
    const options = {
        method,
        url,
        data,
    };
    return axiosInstance(options);
}

// 인증이 필요한 API 요청
export async function apiRequest(url, method = 'GET', data = null) {
    const accessToken = store.getters.accessToken;
    const options = {
        method,
        url,
        data,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
    return axiosInstance(options);
}