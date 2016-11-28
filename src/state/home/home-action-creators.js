import homeActionTypes from './home-action-types';
import * as itemApi from '~/src/api/item-api';

function fetchItems() {
    return (dispatch) => {
        itemApi.fetchItems()
            .then(response => dispatch({
                type: homeActionTypes.FETCH_ITEMS_SUCCEEDED,
                data: response,
            }))
            .catch(error => dispatch({ type: homeActionTypes.FETCH_ITEMS_FAILED }));
    };
}

export function homePageLoaded() {
    return (dispatch) => {
        dispatch(fetchItems());
    };
}

export function itemFocused(itemId) {
    return {
        type: homeActionTypes.ITEM_FOCUSED,
        data: { itemId },
    };
}
