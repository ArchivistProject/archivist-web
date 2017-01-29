import userActionTypes from './user-action-types';

const initialState = {
    usernameField: '',
    passwordField: '',
};

export default function (state = initialState, action) {
    switch (action.type) {
        case userActionTypes.USERNAME_CHANGED: {
            const { username } = action.data;
            return {
                ...state,
                usernameField: username,
            };
        }

        case userActionTypes.PASSWORD_CHANGED: {
            const { password } = action.data;
            return {
                ...state,
                passwordField: password,
            };
        }

        case userActionTypes.LOGIN_REQUESTED: {
            return {
                ...state,
            };
        }
    }
    return state;
}
