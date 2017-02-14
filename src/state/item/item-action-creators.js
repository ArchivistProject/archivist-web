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
            if (!sidebar.visible) {
                dispatch({
                    type: sidebarActionTypes.VISIBILITY_UPDATED,
                    data: { visible: true },
                });
            } else if (sidebar.editMode) {
                dispatch({
                    type: sidebarActionTypes.EDIT_MODE_TOGGLED,
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
        const { item: { activeItem, activeItemEditing } } = getState();
        itemApi.updateItemMetadata(activeItem, activeItemEditing)
            .then((response) => {
                dispatch({ type: itemActionTypes.METADATA_SAVE_SUCCEEDED });
                if (response.length) {
                    dispatch(fetchItem(activeItem.id));
                }
            })
            .catch(error => dispatch({ type: itemActionTypes.METADATA_SAVE_FAILED }));
    };
}

export function updateTags(tags) {
    return (dispatch, getState) => {
        dispatch({
            type: itemActionTypes.TAGS_UPDATED,
            data: { tags },
        });

        const { item: { activeItem } } = getState();
        itemApi.updateTags(activeItem, tags)
            .then((response) => {
                console.log(response);
                dispatch({ type: itemActionTypes.TAGS_UPDATE_SUCCEEDED });
                dispatch(fetchItem(activeItem.id));
            })
            .catch(error => dispatch({ type: itemActionTypes.TAGS_UPDATE_FAILED }));
    };
}

export function headerClicked(header) { // TODO
    return {
        type: itemActionTypes.HEADER_CLICKED,
        data: { header },
    };
}
