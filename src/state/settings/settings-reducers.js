/**
 * Created by Dung Mai on 1/30/2017.
 */
import settingsActionTypes from './settings-action-types';

const initialState = {

    //Password
    showModal: false,
    newPassword: '',
    confirmPassword: '',

    //background color
    showColorModal: false,
    colorPicked: '',
    background: '#fff',

    //api token
    apiToken: '',

    //statistic
    fileCount: 0,
    storage: 0,

    //Item Types
    groups: [],
    itemName: null,
    currentItem: null,
    fieldVisible: false,
    fieldType: null,
    fieldName: null,
    fieldID: null,


};

export default function (state = initialState, action) {
    switch (action.type) {
        case settingsActionTypes.FETCH_ITEMTYPE_SUCCEEDED: {
            const { groups } = action.data;
            return {
                ...state,
                groups: groups,
            };
        }

        case settingsActionTypes.ITEM_NAME_CHANGED: {
            const { name } = action.data;
            return {
                ...state,
               itemName: name,
            };
        }

        case settingsActionTypes.ITEM_NAME_SELECTED: {
            const { itemID } = action.data;
            return {
                ...state,
                 currentItem: itemID,
            };
        }

        case settingsActionTypes.EDIT_CLICKED: {
            return {
                ...state,
                fieldVisible: true,
            };
        }

        case settingsActionTypes.FIELD_TYPE_DROPDOWN_SELECTED: {
            const {type} = action.data;
            return {
                ...state,
                fieldType: type,
            };
        }

        case settingsActionTypes.FIELD_NAME_CHANGED: {
            const {name} = action.data;
            return {
                ...state,
                fieldName: name,
            };
        }

        case settingsActionTypes.FIELD_NAME_SELECTED: {
            const {id} = action.data;
            return {
                ...state,
                fieldID: id,
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

        case settingsActionTypes.BACKGROUND_COLOR_SELECTED: {
            const {color} = action.data;
            return {
                ...state,
                colorPicked: color,
            };
        }

        case settingsActionTypes.BACKGROUND_COLOR_CHANGED: {
            const {color} = action.data;
            return {
                ...state,
                background: color,
            };
        }

        case settingsActionTypes.BACKGROUND_DIALOG_CLOSED: {
            const {val} = action.data;
            return {
                ...state,
                showColorModal: val,
            };
        }

        case settingsActionTypes.BACKGROUND_DIALOG_OPENED: {
            const {val} = action.data;
            return {
                ...state,
                showColorModal: val,
            };
        }


        case settingsActionTypes.FETCH_API_SUCCEEDED: {
            const { apiToken } = action.data;
            return {
                ...state,
                apiToken

            };
        }

        case settingsActionTypes.FETCH_FILE_STORAGE_SUCCEEDED: {
            const { count, size } = action.data;
            return {
                ...state,
                fileCount: count,
                storage: size,
            };
        }

        case settingsActionTypes.POST_ITEM_FAILED: {
            return {
                ...state,
            };
        }

    }
    return state;
}
