import * as uploadApi from '~/src/api/upload-api';
import uploadActionTypes from './upload-action-types';

export function updateUploadFile(file) {
    return {
        type: uploadActionTypes.UPLOAD_FILE_UPDATED,
        data: { file },
    };
}

export function submitFile() {
    return (dispatch, getState) => {
        const state = getState();
        const { file } = state.upload;
        uploadApi.uploadFile(file)
            .then(response => dispatch({ type: uploadActionTypes.FILE_UPLOAD_SUCCEEDED }))
            .catch(error => dispatch({ type: uploadActionTypes.FILE_UPLOAD_FAILED }));
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

export function setAllItemID(itemID){
    return{
        type: uploadActionTypes.SET_ITEM_ID,
        data: {itemID},
    }
}

export function handleTitleChange(name){
    return {
        type: uploadActionTypes.TITLE_CHANGED,
        data: name,
    }
}

export function handleAuthorChange(name){
    return {
        type: uploadActionTypes.AUTHOR_CHANGED,
        data: name,
    }
}

export function handleTagsChange(tag){
    return {
        type: uploadActionTypes.TAGS_CHANGED,
        data: {tag},
    }
}