import settingsActionTypes from './settings-action-types';

const initialState = {

    // Password
    showModal: false,
    newPassword: '',
    confirmPassword: '',

    // api token
    apiToken: '',

    // statistic
    fileCount: 0,
    storage: 0,

    // Item Types
    groups: [],
    metadata_types: [],
    itemName: null,
    currentItem: 'blank',
    fieldVisible: false,
    fieldType: 'blank',
    fieldName: null,
    fieldID: 'blank',
    popupName: null,
    canEdit: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case settingsActionTypes.FETCH_ITEMTYPE_SUCCEEDED: {
            const { groups } = action.data;
            return {
                ...state,
                groups,
            };
        }

        case settingsActionTypes.FETCH_METADATATYPE_SUCCEEDED: {
          const { types } = action.data;

          return {
            ...state,
            metadata_types: types,
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
            const { visible } = action.data;
            return {
                ...state,
                fieldVisible: visible,
            };
        }

        case settingsActionTypes.FIELD_TYPE_DROPDOWN_SELECTED: {
            const { type } = action.data;
            return {
                ...state,
                fieldType: type,
            };
        }

        case settingsActionTypes.FIELD_NAME_CHANGED: {
            const { name } = action.data;
            return {
                ...state,
                fieldName: name,
            };
        }

        case settingsActionTypes.FIELD_NAME_SELECTED: {
            const { id } = action.data;
            return {
                ...state,
                fieldID: id,
            };
        }

        case settingsActionTypes.CONFIRM_PASSWORD_CHANGED: {
            const { password } = action.data;
            return {
                ...state,
                confirmPassword: password,
            };
        }

        case settingsActionTypes.PASSWORD_CHANGED: {
            const { password } = action.data;
            return {
                ...state,
                newPassword: password,
            };
        }

        case settingsActionTypes.PASSWORD_DIALOG_CLOSED: {
            const { val } = action.data;
            return {
                ...state,
                showModal: val,
            };
        }

        case settingsActionTypes.PASSWORD_DIALOG_OPENED: {
            const { val } = action.data;
            return {
                ...state,
                showModal: val,
            };
        }

        case settingsActionTypes.FETCH_API_SUCCEEDED: {
            const { apiToken } = action.data;
            return {
                ...state,
                apiToken,

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

        case settingsActionTypes.FETCH_DOCUMENT_LIST_SETTING_SUCCEEDED: {
            const { docs_per_page, _id } = action.data;

            return {
                ...state,
                documentsPerPage: docs_per_page,
                documentListSettingID: _id.$oid,
            };
        }

        case settingsActionTypes.DOCS_PER_PAGE_CHANGE: {
            const { documentsPerPage } = action.data;
            return {
                ...state,
                documentsPerPage: parseInt(documentsPerPage, 10),
            };
        }

        case settingsActionTypes.POST_ITEM_FAILED: {
            return {
                ...state,
            };
        }

        case settingsActionTypes.POST_ITEM_SUCCEEDED: {
            return {
                ...state,
                itemName: '',
            };
        }

        case settingsActionTypes.DELETE_FIELD_FAILED: {
            return {
                ...state,
            };
        }

        case settingsActionTypes.DELETE_ITEM_FAILED: {
            return {
                ...state,
            };
        }

        case settingsActionTypes.DELETE_ITEM_SUCCEED: {
            return {
                ...state,
                fieldVisible: false,
            };
        }

        case settingsActionTypes.SETTING_POPUP_NAME: {
            const { name } = action.data;
            return {
                ...state,
                popupName: name,
            };
        }

        case settingsActionTypes.SETTING_CAN_EDIT: {
            const { val } = action.data;
            return {
                ...state,
                canEdit: val,
            };
        }

        case settingsActionTypes.POST_FIELD_SUCCEEDED: {
            return {
                ...state,
                fieldName: '',
            };
        }

    }
    return state;
}
