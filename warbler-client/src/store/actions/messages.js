import { apiCall } from '../../services/api'
import { LOAD_MESSAGES, REMOVE_MESSAGE } from '../actionTypes';
import { addError, removeError } from './error';

export const setLoadMessages = (messages) => {
    return {
        type: LOAD_MESSAGES,
        messages
    };
}

export const remove = (id) => {
    return {
        type: REMOVE_MESSAGE,
        id
    };
}

export const removeMessage = (user_id, message_id) => async dispatch => {
    try {
        await apiCall("delete", `/api/user/${user_id}/messages/${message_id}`)
        dispatch(remove(message_id));
        return Promise.resolve();

    } catch (error) {
        dispatch(addError(error.message));
        return Promise.reject(error);

    }
};

export const fetchMessages = () => async dispatch => {
    try {
        const res = await apiCall("get", `/api/messages`)
        dispatch(setLoadMessages(res));
        return Promise.resolve(res.data);

    } catch (error) {
        dispatch(addError(error.message));
        return Promise.reject(error);

    }
};

export const postNewMessage = text => async (dispatch, getState) => {
    let { currentUser } = getState();
    const id = currentUser.user.id;
    try {
        await apiCall('post', `/api/user/${id}/messages/`, { text })
        return Promise.resolve();
    } catch (error) {
        dispatch(addError(error.message));
        return Promise.reject(error);
    }


}