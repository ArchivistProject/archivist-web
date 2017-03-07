import searchActionTypes from './search-action-types';

const initialState = {
    selectedItemType: null,
    metadataRows: [],
    selectedTags: [],
    descriptionInput: '',
};

export default function (state = initialState, action) {
    switch (action.type) {
        case searchActionTypes.ITEM_TYPE_SELECTED: {
            const { itemType } = action.data;
            return {
                ...state,
                selectedItemType: itemType,
            };
        }
        case searchActionTypes.METADATA_ROW_ADDED: {
            const metadataRows = state.metadataRows.slice(0);
            metadataRows.push({
                field: {
                    id: 1,
                    name: null,
                    type: null,
                },
                value: '',
            });
            return {
                ...state,
                metadataRows,
            };
        }
        case searchActionTypes.METADATA_ROW_FIELD_UPDATED: {
            const { rowIndex, field } = action.data;
            const { metadataRows } = state;
            const { value } = metadataRows[rowIndex];
            return {
                ...state,
                metadataRows: [
                    ...metadataRows.slice(0, rowIndex),
                    {
                        field,
                        value,
                    },
                    ...metadataRows.slice(rowIndex + 1, metadataRows.length),
                ],
            };
        }
        case searchActionTypes.METADATA_ROW_VALUE_UPDATED: {
            const { rowIndex, value } = action.data;
            const { metadataRows } = state;
            const { field } = metadataRows[rowIndex];
            return {
                ...state,
                metadataRows: [
                    ...metadataRows.slice(0, rowIndex),
                    {
                        field,
                        value,
                    },
                    ...metadataRows.slice(rowIndex + 1, metadataRows.length),
                ],
            };
        }
        case searchActionTypes.METADATA_ROW_DELETED: {
            const { rowIndex } = action.data;
            const { metadataRows } = state;
            return {
                ...state,
                metadataRows: [
                    ...metadataRows.slice(0, rowIndex),
                    ...metadataRows.slice(rowIndex + 1, metadataRows.length),
                ],
            };
        }
    }
    return state;
}
