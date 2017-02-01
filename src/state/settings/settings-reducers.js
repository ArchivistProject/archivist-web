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
        case settingsActionTypes.SETTINGS_ITEMTYPE_REQUESTED: {
            return {
                ...state,
                waitingForItems: true,
            };
        }

        case settingsActionTypes.FETCH_SETTINGS_ITEMTYPE_SUCCEEDED: {
            const { groups } = action.data;

            return {
                ...state,
                groups

            };
        }

        case settingsActionTypes.FETCH_SETTINGS_ITEMTYPE_FAILED: {
            console.log('error fetching items..');
            return {
                ...state,
                waitingForItems: false,
                fetchItemsFailed: true,
            };
        }
    }
    return state;
}
