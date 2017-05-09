import { push } from 'react-router-redux';
import * as searchApi from '~/src/api/search-api';
import { handleError } from '~/src/utils/utils';
import searchActionTypes from './search-action-types';
import itemActionTypes from '../item/item-action-types';
import { fetchItems } from '../item/item-action-creators';

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

export function toggleGlobalAndOr() {
    return {
        type: searchActionTypes.GLOBAL_AND_OR_CHANGED,
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

export function updateFullText(terms, groupIndex) {
    return {
        type: searchActionTypes.FULLTEXT_UPDATED,
        data: { terms, groupIndex },
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
                dispatch(push('?page=1'));
                dispatch({
                    type: itemActionTypes.FETCH_ITEMS_SUCCEEDED,
                    data: response,
                });
            })
            .catch((error) => {
                dispatch({ type: searchActionTypes.SEARCH_FAILED });
                handleError(error, dispatch);
            });
    };
}

export function reset() {
    return (dispatch) => {
        dispatch({
            type: searchActionTypes.SEARCH_RESET,
            notification: {
                title: 'Search reset',
                level: 'info',
            },
        });
        dispatch(fetchItems(1));
    };
}
