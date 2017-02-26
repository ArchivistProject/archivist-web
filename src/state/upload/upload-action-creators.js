import * as uploadApi from '~/src/api/upload-api';
import uploadActionTypes from './upload-action-types';

export function updateUploadFile(file) {
    return {
        type: uploadActionTypes.UPLOAD_FILE_UPDATED,
        data: { file },
    };
}

export function submitFile(tagArray, metaData) {
    return (dispatch, getState) => {
        const state = getState();
        const { file } = state.upload;
        uploadApi.uploadFile(file, tagArray, metaData);
    };
}

export function fetchItemTypes() {
    return (dispatch) => {
        uploadApi.fetchItemTypes()
            .then(response => dispatch({
                type: uploadActionTypes.FETCH_ITEMS_SUCCEEDED,
                data: response,
            }))
            .catch(error => dispatch({ type: uploadActionTypes.FETCH_ITEMS_FAILED }));
    };
}

export function setAllItemID(itemID) {
    return {
        type: uploadActionTypes.SET_ITEM_ID,
        data: { itemID },
    };
}

export function handleTagsChange(tag) {
    return {
        type: uploadActionTypes.TAGS_CHANGED,
        data: { tag },
    };
}

export function setAllMetaData(array) {
    return {
        type: uploadActionTypes.SET_ALL_METADATA,
        data: { array },
    };
}

export function setFieldVisible(val) {
    return {
        type: uploadActionTypes.SET_FIELD_VISIBLE,
        data: { val },
    };
}

export function setFilePicked(val) {
    return {
        type: uploadActionTypes.SET_FILE_PICKED,
        data: { val },
    };
}

export function resetFile() {
    return {
        type: uploadActionTypes.RESET_FILE_LOAD,
    };
}

export function setAllCheckBoxes(array) {
    return {
        type: uploadActionTypes.SET_ALL_CHECKBOX,
        data: { array },
    };
}

export function setCheckBox(val) {
    return {
        type: uploadActionTypes.SET_CHECKBOX,
        data: { val },
    };
}

export function setFileName(val) {
    return {
        type: uploadActionTypes.SET_FILE_NAME,
        data: { val },
    };
}

export function fetchItemTypes() {
    return (dispatch) => {
        /**
        dispatch({
            type: itemActionTypes.ITEMS_REQUESTED,
        });**/
        uploadApi.fetchItemTypes()
            .then(response => dispatch({
                type: uploadActionTypes.FETCH_ITEMS_SUCCEEDED,
                data: response,
            }))
            .catch(error => dispatch({ type: uploadActionTypes.FETCH_ITEMS_FAILED }));
    };
}

export function setActiveItem(itemID) {
    return {
        type: uploadActionTypes.FIELDS_RENDERED,
        data: { itemID },
    };
}

export function handleTitleChange(name) {
    return {
        type: uploadActionTypes.TITLE_CHANGED,
        data: name,
    };
}

export function handleAuthorChange(name) {
    return {
        type: uploadActionTypes.AUTHOR_CHANGED,
        data: name,
    };
}

export function handleTagsChange(tag) {
    return {
        type: uploadActionTypes.TAGS_CHANGED,
        data: tag,
    };
}
