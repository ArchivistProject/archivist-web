import itemActionTypes from './item-action-types';
import sidebarActionTypes from '../sidebar/sidebar-action-types';
import * as itemApi from '~/src/api/item-api';

export function fetchItems() {
    return (dispatch) => {
        itemApi.fetchItems()
            .then(response => dispatch({
                type: itemActionTypes.FETCH_ITEMS_SUCCEEDED,
                data: response,
            }))
            .catch(error => dispatch({ type: itemActionTypes.FETCH_ITEMS_FAILED }));
    };
}

export function itemFocused(itemId) {
    return (dispatch, getState) => {
        const { item, sidebar } = getState();
        if (item.activeItemId !== itemId) {
            dispatch({
                type: itemActionTypes.ITEM_FOCUSED,
                data: { itemId },
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
