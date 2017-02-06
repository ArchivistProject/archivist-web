import uploadActionTypes from './upload-action-types';

const initialState = {
    file: null,
    groups: [],
    fieldVisible: false,
    activeItem: null,
    title: '',
    author: '',
    tags: [],
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
                activeItem: groups[0].id,
                fieldVisible: true,
            }
        }

        case uploadActionTypes.FIELDS_RENDERED: {
            const {itemID} = action.data;
            return {
                ...state,
                activeItem: itemID,
            }
        }

        case uploadActionTypes.TITLE_CHANGED: {
            const {name} = action.data;
            return {
                ...state,
                title: name,
            }
        }

        case uploadActionTypes.AUTHOR_CHANGED: {
            const {name} = action.data;
            return {
                ...state,
                author: name,
            }
        }

        case uploadActionTypes.TAGS_CHANGED: {
            const {tag} = action.data;
            return {
                ...state,
                tags: tag,
            }
        }
    }
    return state;
}
