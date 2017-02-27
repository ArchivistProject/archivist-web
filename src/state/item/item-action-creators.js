import * as itemApi from '~/src/api/item-api';
import itemActionTypes from './item-action-types';
import sidebarActionTypes from '../sidebar/sidebar-action-types';

export function fetchItems(currentPage) {
    return (dispatch) => {
        dispatch({
            type: itemActionTypes.ITEMS_REQUESTED,
        });
        itemApi.fetchItems(currentPage)
            .then(response => dispatch({
                type: itemActionTypes.FETCH_ITEMS_SUCCEEDED,
                data: response,
            }))
            .catch(error => dispatch({ type: itemActionTypes.FETCH_ITEMS_FAILED }));
    };
}

export function fetchItem(itemId) {
    return (dispatch) => {
        dispatch({
            type: itemActionTypes.ITEM_REQUESTED,
        });
        itemApi.fetchItem(itemId)
            .then(response => dispatch({
                type: itemActionTypes.FETCH_ITEM_SUCCEEDED,
                data: response,
            }))
            .catch(error => dispatch({ type: itemActionTypes.FETCH_ITEM_FAILED }));
    };
}

export function fetchHeaders() {
    return (dispatch) => {
        itemApi.fetchHeaders()
            .then(response => dispatch({
                type: itemActionTypes.FETCH_HEADERS_SUCCEEDED,
                data: response,
            }))
            .catch(error => dispatch({ type: itemActionTypes.FETCH_HEADERS_FAILED }));
    };
}

export function itemFocused(itemIndex) {
    return (dispatch, getState) => {
        const { item, sidebar } = getState();
        const itemId = item.items[itemIndex].id;
        if (item.activeItemIndex !== itemIndex || item.activeItem.id !== itemId) {
            dispatch({
                type: itemActionTypes.ITEM_FOCUSED,
                data: { itemIndex },
            });
            dispatch(fetchItem(itemId));
            if (!sidebar.visible) {
                dispatch({
                    type: sidebarActionTypes.VISIBILITY_UPDATED,
                    data: { visible: true },
                });
            }
        }
    };
}

export function updateMetadata(metadataIndex, value) {
    return {
        type: itemActionTypes.METADATA_UPDATED,
        data: { metadataIndex, value },
    };
}

export function saveMetadata() {
    return (dispatch, getState) => {
        const { item: { activeItem, activeItemEditing, meta: { currentPage } } } = getState();
        itemApi.updateItemMetadata(activeItem, activeItemEditing)
            .then((success) => {
                dispatch({ type: itemActionTypes.METADATA_UPDATE_SUCCEEDED });
                dispatch(fetchItem(activeItem.id));
            })
            .catch(error => dispatch({ type: itemActionTypes.METADATA_UPDATE_FAILED }));
    };
}

export function saveTags(tags) {
    return (dispatch, getState) => {
        const tagSet = new Set(tags);
        const tagArray = Array.from(tagSet.values());
        dispatch({
            type: itemActionTypes.TAGS_UPDATED,
            data: { tags: tagArray },
        });

        const { item: { activeItem } } = getState();
        itemApi.updateTags(activeItem, tags)
            .then((response) => {
                dispatch({ type: itemActionTypes.TAGS_UPDATE_SUCCEEDED });
                // Updating the activeItem with TAGS_UPDATED, so no need to call fetchItem
            })
            .catch(error => dispatch({ type: itemActionTypes.TAGS_UPDATE_FAILED }));
    };
}

export function updateDescription(description) {
    return {
        type: itemActionTypes.DESCRIPTION_UPDATED,
        data: { description },
    };
}

export function saveDescription() {
    return (dispatch, getState) => {
        const { item: { activeItemEditing } } = getState();
        itemApi.updateDescription(activeItemEditing)
            .then((response) => {
                dispatch({ type: itemActionTypes.DESCRIPTION_UPDATE_SUCCEEDED });
                dispatch(fetchItem(activeItemEditing.id));
            })
            .catch(error => dispatch({ type: itemActionTypes.DESCRIPTION_UPDATE_FAILED }));
    };
}

export function headerClicked(header) { // TODO
    return {
        type: itemActionTypes.HEADER_CLICKED,
        data: { header },
    };
}
