import searchActionTypes from './search-action-types';

export function itemTypeSelected(itemType) {
    return {
        type: searchActionTypes.ITEM_TYPE_SELECTED,
        data: { itemType },
    };
}

export function metadataRowAdded() {
    return {
        type: searchActionTypes.METADATA_ROW_ADDED,
    };
}

export function metadataRowFieldUpdated(rowIndex, field) {
    return {
        type: searchActionTypes.METADATA_ROW_FIELD_UPDATED,
        data: { rowIndex, field },
    };
}

export function metadataRowValueUpdated(rowIndex, value) {
    return {
        type: searchActionTypes.METADATA_ROW_VALUE_UPDATED,
        data: { rowIndex, value },
    };
}

export function metadataRowDeleted(rowIndex) {
    return {
        type: searchActionTypes.METADATA_ROW_DELETED,
        data: { rowIndex },
    };
}
