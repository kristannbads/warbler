import axios from "axios";

export async function apiCall(method, path, data) {
    try {
        const response = await axios[method](path, data);

        if (response) {
            console.log(response)
            return response.data;
        }
        throw new Error("Empty response");
    } catch (error) {
        throw error.response.data.error;
    }
};

