import * as settingsApi from '~/src/api/settings-api';
import settingsActionTypes from './settings-action-types';

export function fetchItemTypes() {
    return (dispatch) => {
        settingsApi.fetchItemTypes()
            .then(response => dispatch({
                type: settingsActionTypes.FETCH_ITEMTYPE_SUCCEEDED,
                data: response,
            }))
            .catch((error) => { throw new Error('Item type failed', error); });
    };
}

export function fetchMetadataTypes() {
    return (dispatch) => {
        settingsApi.fetchMetadataTypes()
        .then(response => dispatch({
            type: settingsActionTypes.FETCH_METADATATYPE_SUCCEEDED,
            data: response,
        }))
        .catch((error) => {
            throw new Error('Fetching metadata types failed', error);
        });
    };
}

export function handleItemNameChange(name) {
    return {
        type: settingsActionTypes.ITEM_NAME_CHANGED,
        data: { name },
    };
}

export function addItem(name) {
    return {
        type: settingsActionTypes.ITEM_ADDED,
        data: name,
    };
}

export function setActiveItem(itemID) {
    return {
        type: settingsActionTypes.ITEM_NAME_SELECTED,
        data: { itemID },
    };
}

export function postItemType(name) {
    return (dispatch) => {
        settingsApi.postItemType(name)
            .then((response) => {
                dispatch({ type: settingsActionTypes.POST_ITEM_SUCCEEDED });
                dispatch(fetchItemTypes());
            })
            .catch(error => dispatch({ type: settingsActionTypes.POST_ITEM_FAILED }));
    };
}

export function postFieldType(name, type, id) {
    return (dispatch) => {
        settingsApi.postFieldType(name, type, id)
            .then((response) => {
                dispatch({ type: settingsActionTypes.POST_FIELD_SUCCEEDED });
                dispatch(fetchItemTypes());
            })
            .catch(error => dispatch({ type: settingsActionTypes.POST_FIELD_FAILED }));
    };
}


export function deleteItem(groupID) {
    return (dispatch) => {
        settingsApi.deleteItem(groupID)
            .then((response) => {
                dispatch(fetchItemTypes());
                dispatch({
                    type: settingsActionTypes.DELETE_ITEM_SUCCEED,
                    notification: {
                        title: 'Category Deleted',
                        message: 'Category deleted successfully.',
                        level: 'success',
                    },
                });
            })
            .catch(error => dispatch({
                type: settingsActionTypes.DELETE_ITEM_FAILED,
                notification: {
                    title: 'Category Not Deleted',
                    message: 'Category was not deleted successfully.',
                    level: 'error',
                },
            }));
    };
}


export function removeField(groupID, fieldID) {
    return (dispatch) => {
        settingsApi.deleteField(groupID, fieldID)
            .then((response) => {
                dispatch({
                    type: settingsActionTypes.DELETE_FIELD_SUCCEEDED,
                    notification: {
                        title: 'Field Deleted',
                        message: 'Metadata field deleted successfully.',
                        level: 'success',
                    },
                });
                dispatch(fetchItemTypes());
            })
            .catch(error => dispatch({
                type: settingsActionTypes.DELETE_FIELD_FAILED,
                notification: {
                    title: 'Field Not Deleted',
                    message: 'Metadata field was not deleted successfully.',
                    level: 'error',
                },
            }));
    };
}


export function setFieldVisible(visible) {
    return {
        type: settingsActionTypes.EDIT_CLICKED,
        data: { visible },
    };
}

export function setFieldType(type) {
    return {
        type: settingsActionTypes.FIELD_TYPE_DROPDOWN_SELECTED,
        data: { type },
    };
}

export function setFieldName(name) {
    return {
        type: settingsActionTypes.FIELD_NAME_CHANGED,
        data: { name },
    };
}

export function setFieldID(id) {
    return {
        type: settingsActionTypes.FIELD_NAME_SELECTED,
        data: { id },
    };
}

export function setPopupName(name) {
    return {
        type: settingsActionTypes.SETTING_POPUP_NAME,
        data: { name },
    };
}

export function setCanEdit(val) {
    return {
        type: settingsActionTypes.SETTING_CAN_EDIT,
        data: { val },
    };
}

// ----------------------Password-------------------------------

export function newPasswordChange(password) {
    return {
        type: settingsActionTypes.PASSWORD_CHANGED,
        data: { password },
    };
}

export function confirmPasswordChange(password) {
    return {
        type: settingsActionTypes.CONFIRM_PASSWORD_CHANGED,
        data: { password },
    };
}

export function closeDialog(val) {
    return {
        type: settingsActionTypes.PASSWORD_DIALOG_CLOSED,
        data: { val },
    };
}

export function openDialog(val) {
    return {
        type: settingsActionTypes.PASSWORD_DIALOG_OPENED,
        data: { val },
    };
}

// ----------------------API Token---------------------------
export function refreshAPI() {
    return (dispatch) => {
        settingsApi.fetchAPIToken()
            .then(response => dispatch({
                type: settingsActionTypes.FETCH_API_SUCCEEDED,
                data: response,
            }))
            .catch((error) => { throw new Error('fetch api token failed', error); });
    };
}

// ----------------------Document List---------------------------
export function saveDocumentListSettings(documentListSettingID, documentsPerPage) {
    return (dispatch) => {
        settingsApi.postDocumentListSettings(documentListSettingID, documentsPerPage)
            .then(response => dispatch({
                type: settingsActionTypes.POST_DOCUMENT_LIST_SETTING_SUCCEEDED,
                data: response,
                notification: {
                    title: 'Setting Saved',
                    message: `${documentsPerPage} files will now be displayed per page.`,
                    level: 'success',
                },
            }))
            .catch((error) => {
                throw new Error('Saving Document List Settings Failed', error);
            });
    };
}

export function fetchDocumentListSettings() {
    return (dispatch) => {
        settingsApi.fetchDocumentListSettings()
        .then(response => dispatch({
            type: settingsActionTypes.FETCH_DOCUMENT_LIST_SETTING_SUCCEEDED,
            data: response,
        }))
        .catch((error) => { throw new Error('Fetch Document List Settings failed', error); });
    };
}

export function handleDocsPerPageChange(documentsPerPage) {
    return {
        type: settingsActionTypes.DOCS_PER_PAGE_CHANGE,
        data: { documentsPerPage },
    };
}

// -------------------statistic-------------------------------
export function fetchFileStorage() {
    return (dispatch) => {
        settingsApi.fetchFileStorage()
            .then(response => dispatch({
                type: settingsActionTypes.FETCH_FILE_STORAGE_SUCCEEDED,
                data: response,
            }))
            .catch((error) => { throw new Error('Fetch file storage failed', error); });
    };
}

export function errorNotification(msg) {
    return {
        type: settingsActionTypes.INPUT_ERROR,
        notification: {
            title: msg,
            level: 'error',
        },
    };
}
