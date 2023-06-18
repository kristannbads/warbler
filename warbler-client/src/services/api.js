import axios from "axios";
const BASE_URL = "http://localhost:3000"

export function setTokenHeader(token) {
    if (token) {
        const data = axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

export async function apiCall(method, path, data) {
    try {
        const response = await axios[method.toLowerCase()](`${BASE_URL}${path}`, data);

        if (response) {

            return response.data;
        }
        throw new Error("Empty response");
    } catch (error) {
        throw error.response.data.error;
    }
};


