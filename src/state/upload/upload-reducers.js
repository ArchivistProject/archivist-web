import uploadActionTypes from './upload-action-types';

const initialState = {
    file: null,
    groups: [],
    fieldVisible: false,
    tags: [],
    allItemID: [],
    allMetaDataValue: [],
    filePicked: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case uploadActionTypes.UPLOAD_FILE_UPDATED: {
            const { file } = action.data;
            return {
                ...state,
                file,
                filePicked: true,
            };
        }
        case uploadActionTypes.FILE_UPLOAD_SUCCEEDED: {
            return {
                ...state,
                tags: [],
                allMetaDataValue: [],
                file: null,
            };
        }
        case uploadActionTypes.FILE_UPLOAD_FAILED: {
            return {
                ...state,
            };
        }

        case uploadActionTypes.FETCH_ITEMS_SUCCEEDED: {
            const { groups } = action.data;
            return {
                ...state,
                groups,
            };
        }

        case uploadActionTypes.SET_ITEM_ID: {
            const { itemID } = action.data;
            return {
                ...state,
                allItemID: itemID,
            };
        }

        case uploadActionTypes.TAGS_CHANGED: {
            const { tag } = action.data;
            return {
                ...state,
                tags: tag,
            };
        }

        case uploadActionTypes.SET_ALL_METADATA: {
            const { array } = action.data;
            return {
                ...state,
                allMetaDataValue: array,
            };
        }

        case uploadActionTypes.SET_FIELD_VISIBLE: {
            const { val } = action.data;
            return {
                ...state,
                fieldVisible: val,
            };
        }

        case uploadActionTypes.SET_FILE_PICKED: {
            const { val } = action.data;
            return {
                ...state,
                filePicked: val,
            };
        }

        case uploadActionTypes.RESET_FILE_LOAD: {
            return {
                ...state,
                file: null,
            };
        }
    }
    return state;
}
