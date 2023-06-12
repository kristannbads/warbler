import { apiCall, setTokenHeader } from '../../services/api'
import { SET_CURRENT_USER } from '../actionTypes';
import { addError, removeError } from './error';





export const setCurrentUser = (user) => {
    return {
        type: SET_CURRENT_USER,
        user
    };
}

export function setAuthorizationToken(token) {
    setTokenHeader(token);
}

export const logout = () => dispatch => {
    try {
        localStorage.clear()
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}))
    } catch (error) {
        dispatch(addError(error.message));
        return error;
    }
}

export const authUser = (type, userData) => async dispatch => {
    try {
        const { token, ...user } = await apiCall("post", `/api/auth/${type}`, userData)
        localStorage.setItem("jwtToken", token);
        setAuthorizationToken(token);
        dispatch(setCurrentUser(user))
        dispatch(removeError());
        return Promise.resolve();

    } catch (error) {
        dispatch(addError(error.message));
        return error;
    }
};

