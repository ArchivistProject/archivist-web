import * as userApi from '~/src/api/user-api';
import { APP_CONSTANTS } from '~/src/utils/app-constants';
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

export function login(username, password, router) {
    return (dispatch) => {
        userApi.login(username, password, router)
            .then((response) => {
                const { auth_token: token, error } = response;
                if (token) {
                    localStorage.setItem(APP_CONSTANTS.AUTH_TOKEN, token);
                    dispatch({
                        type: userActionTypes.LOGIN_SUCCEEDED,
                    });
                    router.push('/');
                } else {
                    throw new Error(error);
                }
            })
            .catch((error) => {
                dispatch({
                    type: userActionTypes.LOGIN_FAILED,
                    notification: {
                        title: 'Authentication failed',
                        message: error.message,
                        level: 'error',
                    },
                });
            });
    };
}

export function logout(router) {
    return (dispatch) => {
        dispatch({
            type: userActionTypes.LOGOUT,
            notification: {
                title: 'Logout successful',
                message: 'You have been logged out.',
                level: 'success',
            },
        });
        router.push('/login');
        localStorage.removeItem(APP_CONSTANTS.AUTH_TOKEN);
    };
}

export function checkAuth(router) {
    return (dispatch) => {
        dispatch({
            type: userActionTypes.CHECK_AUTH,
        });
        userApi.checkAuth()
            .then((response) => {
                const { valid } = response;
                if (valid) {
                    dispatch({
                        type: userActionTypes.AUTH_VALIDATED,
                    });
                } else {
                    throw new Error();
                }
            })
            .catch((error) => {
                router.push('/login');
                dispatch({
                    type: userActionTypes.AUTH_FAILED,
                    notification: {
                        title: 'Authentication failed',
                        message: 'Please log in.',
                        level: 'error',
                    },
                });
            });
    };
}
