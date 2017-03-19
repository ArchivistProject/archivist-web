import * as searchApi from '~/src/api/search-api';
import searchActionTypes from './search-action-types';
import itemActionTypes from '../item/item-action-types';

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

export function addItemTypeRow(groupIndex, filteredItemTypes) {
    const value = filteredItemTypes.length > 0 ? filteredItemTypes[0] : null;
    return {
        type: searchActionTypes.ITEM_TYPE_ROW_ADDED,
        data: { groupIndex, value },
    };
}

export function deleteItemTypeRow(itemTypeIndex, groupIndex) {
    return {
        type: searchActionTypes.ITEM_TYPE_ROW_DELETED,
        data: { itemTypeIndex, groupIndex },
    };
}

export function selectItemType(itemType, itemTypeIndex, groupIndex) {
    return {
        type: searchActionTypes.ITEM_TYPE_SELECTED,
        data: { itemType, itemTypeIndex, groupIndex },
    };
}

export function addMetadataRow(groupIndex) {
    return {
        type: searchActionTypes.METADATA_ROW_ADDED,
        data: { groupIndex },
    };
}

export function updateMetadataItemType(itemType, rowIndex, groupIndex) {
    return {
        type: searchActionTypes.METADATA_ROW_ITEM_TYPE_UPDATED,
        data: { itemType, rowIndex, groupIndex },
    };
}

export function updateMetadataField(field, rowIndex, groupIndex) {
    return {
        type: searchActionTypes.METADATA_ROW_FIELD_UPDATED,
        data: { field, rowIndex, groupIndex },
    };
}

export function updateMetadataValue(value, rowIndex, groupIndex) {
    return {
        type: searchActionTypes.METADATA_ROW_VALUE_UPDATED,
        data: { value, rowIndex, groupIndex },
    };
}

export function deleteMetadataRow(rowIndex, groupIndex) {
    return {
        type: searchActionTypes.METADATA_ROW_DELETED,
        data: { rowIndex, groupIndex },
    };
}

export function updateTags(tags, groupIndex) {
    return {
        type: searchActionTypes.TAGS_UPDATED,
        data: { tags, groupIndex },
    };
}

export function updateDescription(description, groupIndex) {
    return {
        type: searchActionTypes.DESCRIPTION_UPDATED,
        data: { description, groupIndex },
    };
}

export function submitSearch() {
    return (dispatch, getState) => {
        const state = getState();
        const { search: { searchGroups } } = state;
        dispatch({ type: searchActionTypes.SEARCH_SUBMITTED });
        searchApi.search(searchGroups)
            .then((response) => {
                dispatch({ type: searchActionTypes.SEARCH_SUCCESSFUL });
                dispatch({
                    type: itemActionTypes.FETCH_ITEMS_SUCCEEDED,
                    data: response,
                });
            })
            .catch(error => console.warn(error));
        // SEARCH_SUCCESSFUL
        // SEARCH_FAILED
    };
}
