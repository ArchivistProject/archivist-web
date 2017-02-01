import * as settingsApi from '~/src/api/settings-api';
import settingsActionTypes from './settings-action-types';

export function fetchItemType() {
    return (dispatch) => {
        settingsApi.fetchItemType()
            .then(response => dispatch({
                type: settingsActionTypes.FETCH_SETTINGS_ITEMTYPE_SUCCEEDED,
                data: response,
            }))
            .catch(error => { throw new Error("Item type failed", error); });
    };
}

export function postItemType(itemName) {
    return (dispatch) => {
        settingsApi.postItemType(itemName);
    };
}


//----------------------Password-------------------------------

export function newPasswordChange(password) {
    return {
        type: settingsActionTypes.PASSWORD_CHANGED,
        data: {password}
    }
}

export function confirmPasswordChange(password) {
    return {
        type: settingsActionTypes.CONFIRM_PASSWORD_CHANGED,
        data: {password}
    }
}

export function closeDialog(val){
    return {
        type: settingsActionTypes.PASSWORD_DIALOG_CLOSED,
        data:  { val }
    }
}

export function openDialog(val) {
    return {
        type: settingsActionTypes.PASSWORD_DIALOG_OPENED,
        data: { val }
    }
}

//----------------------------Background color---------------------------------

export function closeColorDialog(val){
    return {
        type: settingsActionTypes.BACKGROUND_DIALOG_CLOSED,
        data:  { val }
    }
}

export function openColorDialog(val) {
    return {
        type: settingsActionTypes.BACKGROUND_DIALOG_OPENED,
        data: { val }
    }
}


export function handleOnSelectColor(hexColor) {
    return {
        type: settingsActionTypes.BACKGROUND_COLOR_SELECTED,
        data: { hexColor }
    }
}

export function changeBackgroundColor(color) {
    return {
        type: settingsActionTypes.BACKGROUND_COLOR_CHANGED,
        data: { color }
    }
}


//----------------------API Token---------------------------
export function refreshAPI(){
    return (dispatch) => {
        settingsApi.fetchAPIToken()
            .then(response => dispatch({
                type: settingsActionTypes.FETCH_API_SUCCEEDED,
                data: response,
            }))
            .catch(error => { throw new Error("fetch api token failed", error); });
    };
}

//-------------------statistic-------------------------------
export function fetchFileStorage(){
    return (dispatch) => {
        settingsApi.fetchFileStorage()
            .then(response => dispatch({
                type: settingsActionTypes.FETCH_FILE_STORAGE_SUCCEEDED,
                data: response,
            }))
            .catch(error => { throw new Error("Fetch file storage failed", error); });
    };
}
