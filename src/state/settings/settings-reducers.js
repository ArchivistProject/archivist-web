/**
 * Created by Dung Mai on 1/30/2017.
 */
import settingsActionTypes from './settings-action-types';

const initialState = {

    //items: null,
    groups: null,

    //Password
    showModal: false,
    newPassword: '',
    confirmPassword: '',


};

export default function (state = initialState, action) {
    switch (action.type) {
        case settingsActionTypes.FETCH_SETTINGS_ITEMTYPE_SUCCEEDED: {
            const { groups } = action.data;

            return {
                ...state,
                groups

            };
        }

        case settingsActionTypes.CONFIRM_PASSWORD_CHANGED: {
            const {password} = action.data;
            return {
                ...state,
                confirmPassword: password,
            };
        }

        case settingsActionTypes.PASSWORD_CHANGED: {
            const {password} = action.data;
            return {
                ...state,
                newPassword: password,
            };
        }

        case settingsActionTypes.PASSWORD_DIALOG_CLOSED: {
            const {val} = action.data;
            return {
                ...state,
                showModal: val,
            };
        }

        case settingsActionTypes.PASSWORD_DIALOG_OPENED: {
            const {val} = action.data;
            return {
                ...state,
                showModal: val,
            };
        }

    }
    return state;
}
