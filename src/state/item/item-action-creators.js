import itemActionTypes from './item-action-types';
import sidebarActionTypes from '../sidebar/sidebar-action-types';
import * as itemApi from '~/src/api/item-api';

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
            }
        }
    };
}

export function headerClicked(header) { // TODO
    return {
        type: itemActionTypes.HEADER_CLICKED,
        data: { header },
    };
}
