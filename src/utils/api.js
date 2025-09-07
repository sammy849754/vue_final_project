import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
})

// 註冊
export const register  = async (email, password, nickname) => {
    const response = await api.post('/users/sign_up', {
        email,
        password,
        nickname
    });
    return response;
}

// 登入
export const login = async (email, password) => {
    const response = await api.post('/users/sign_in', {
        email,
        password
    });
    return response;
}

// 驗證登入
export const checkout = async (token) => {
    const response = await api.get('/users/checkout', {
        headers: {
            Authorization: token
        }
    });
    return response;
}