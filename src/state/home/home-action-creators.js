import homeActionTypes from './home-action-types';
import * as itemActionCreators from '../item/item-action-creators';
import actionBarActionTypes from '../action-bar/action-bar-action-types';
import * as itemApi from '~/src/api/item-api';


export function homePageLoaded() {
    return (dispatch) => {
        dispatch(itemActionCreators.fetchItems());
        dispatch({
            type: actionBarActionTypes.VISIBILITIES_UPDATED,
            data: {
                backVisible: false,
                uploadVisible: true,
                searchVisible: true,
            },
        });
    };
}
