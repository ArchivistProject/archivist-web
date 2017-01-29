import * as userApi from '~/src/api/user-api';
import userActionTypes from './user-action-types';

export function usernameChanged(username) {
    return {
        type: userActionTypes.USERNAME_CHANGED,
        data: { username },
    };
}

export function passwordChanged(password) {
    return {
        type: userActionTypes.PASSWORD_CHANGED,
        data: { password },
    };
}

export function login(username, password) {
    return (dispatch) => {
        userApi.login(username, password);
            // .then(response => dispatch({
            //     type: userActionTypes.LOGIN_SUCCEEDED,
            //     data: response,
            // }))
            // .catch(error => dispatch({ type: userActionTypes.LOGIN_FAILED, data: error }));
    };
}
