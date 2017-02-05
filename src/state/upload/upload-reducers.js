import uploadActionTypes from './upload-action-types';

const initialState = {
    file: null,
    groups: [],
    fieldVisible: false,
    activeItem: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case uploadActionTypes.UPLOAD_FILE_UPDATED: {
            const {file} = action.data;
            return {
                ...state,
                file,
            };
        }
        case uploadActionTypes.FILE_UPLOAD_SUCCEEDED: {
            return {
                ...state,
            };
        }
        case uploadActionTypes.FILE_UPLOAD_FAILED: {
            return {
                ...state,
            };
        }

        case uploadActionTypes.FETCH_ITEMS_SUCCEEDED: {
            const {groups} = action.data;
            return {
                ...state,
                groups: groups,
            }
        }

        case uploadActionTypes.FIELDS_RENDERED: {
            const {itemID} = action.data;
            return {
                ...state,
                activeItem: itemID,
                fieldVisible: true,
            }
        }

    }
    return state;
}
