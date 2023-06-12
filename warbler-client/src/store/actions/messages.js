import { apiCall } from '../../services/api'
import { LOAD_MESSAGES, REMOVE_MESSAGE } from '../actionTypes';
import { addError } from './error';

export const setLoadMessages = (messages) => {
    return {
        type: LOAD_MESSAGES,
        messages
    };
}

export const fetchMessages = () => async dispatch => {
    try {
        const res = await apiCall("get", `/api/messages`)
        dispatch(setLoadMessages(res));
        console.log(res)
        return Promise.resolve(res.data);

    } catch (error) {
        dispatch(addError(error.message));
        return Promise.reject(error);

    }
};