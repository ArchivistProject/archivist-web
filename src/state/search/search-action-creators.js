import searchActionTypes from './search-action-types';

export function addSearchGroup(groupType) {
    return {
        type: searchActionTypes.SEARCH_GROUP_ADDED,
        data: { groupType },
    };
}

export function deleteSearchGroup(groupIndex) {
    return {
        type: searchActionTypes.SEARCH_GROUP_DELETED,
        data: { groupIndex },
    };
}

export function toggleGroupAndOr(groupIndex) {
    return {
        type: searchActionTypes.GROUP_AND_OR_CHANGED,
        data: { groupIndex },
    };
}

export function toggleGroupNot(groupIndex) {
    return {
        type: searchActionTypes.GROUP_NOT_CHANGED,
        data: { groupIndex },
    };
}


export function addItemTypeRow(groupIndex) {
    return {
        type: searchActionTypes.ITEM_TYPE_ROW_ADDED,
        data: { groupIndex },
    };
}

export function selectItemType(itemType, itemTypeIndex, groupIndex) {
    return {
        type: searchActionTypes.ITEM_TYPE_SELECTED,
        data: { itemType, itemTypeIndex, groupIndex },
    };
}

export function addMetadataRow() {
    return {
        type: searchActionTypes.METADATA_ROW_ADDED,
    };
}

export function updateMetadataField(rowIndex, field) {
    return {
        type: searchActionTypes.METADATA_ROW_FIELD_UPDATED,
        data: { rowIndex, field },
    };
}

export function updateMetadataValue(rowIndex, value) {
    return {
        type: searchActionTypes.METADATA_ROW_VALUE_UPDATED,
        data: { rowIndex, value },
    };
}

export function deleteMetadataRow(rowIndex) {
    return {
        type: searchActionTypes.METADATA_ROW_DELETED,
        data: { rowIndex },
    };
}
