import * as settingsApi from '~/src/api/settings-api';

export function fetchItemType() {
    return (dispatch) => {
        settingsApi.fetchItemTypes()
            .then(response => dispatch({
                data: response,
            }))
            .catch(error => { throw new Error(error); });
    };
}

