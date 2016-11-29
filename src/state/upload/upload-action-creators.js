import uploadActionTypes from './upload-action-types';
import * as uploadApi from '~/src/api/upload-api';

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
