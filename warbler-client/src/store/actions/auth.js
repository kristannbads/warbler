import { apiCall } from '../../services/api'
import { SET_CURRENT_USER } from '../actionTypes';
import { addError, removeError } from './error';

const BASE_URL = "http://localhost:3000"

export const setCurrentUser = (user) => {
    return {
        type: SET_CURRENT_USER,
        user
    };
}

export const authUser = (type, userData) => async dispatch => {
    try {
        const { token, ...user } = await apiCall("post", `${BASE_URL}/api/auth/${type}`, userData)
        localStorage.setItem("jwtToken", token);
        dispatch(setCurrentUser(user))
        dispatch(removeError());
        return Promise.resolve();

    } catch (error) {
        dispatch(addError(error.message));
        return Promise.reject(error);
    }
};