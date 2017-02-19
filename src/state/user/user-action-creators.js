import * as userApi from '~/src/api/user-api';
import userActionTypes from './user-action-types';
import { browserHistory } from 'react-router';

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

export function login(username, password, history) {
    return (dispatch) => {
        userApi.login(username, password, history)
            .then((response) => {
                const { auth_token } = response;
                console.log(auth_token);
                localStorage.setItem('auth_token', auth_token);
                dispatch({
                    type: userActionTypes.LOGIN_SUCCEEDED,
                });
                history.push('/');
            })
            .catch((error) => {
                console.log(error);
                dispatch({
                    type: userActionTypes.LOGIN_FAILED,
                });
            });
    };
}

export function checkAuth(redirect, history) {
    return (dispatch) => {
        console.log(redirect, history);
        dispatch({
            type: userActionTypes.CHECK_AUTH,
        });
        userApi.checkAuth()
            .then((response) => {
                const { valid } = response;
                if (valid) {
                    history.push(redirect);
                } else {
                    history.push('/login');
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
}
