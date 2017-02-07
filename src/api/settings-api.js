import config from '~/config';


export function fetchItemTypes() {
    return fetch(`${config.backend}/system/groups`)
        .then(response => response.json())
        .catch((error) => { throw new Error(error); });
}


export function postItemType(itemName) {
    const items = {
        "group": {
            "name": itemName,
            "fields": []
        }
    };

    $.post(`${config.backend}/system/groups`, items);
}


export function postBackgroundColor(color) {
    const backgroundColor = {
        "color": {
            "name": color,
        }
    };

    $.post(`${config.backend}/theURL`, backgroundColor);
}

//-------------------------Api token----------------------------------
export function fetchAPIToken() {
    return fetch(`${config.backend}/theURL`)
        .then(response => response.json())
        .catch((error) => { throw new Error(error); });
}


//--------------------------Statistic--------------------

export function fetchFileStorage() {
    return fetch(`${config.backend}/statistics/documents`)
        .then(response => response.json())
        .catch((error) => { throw new Error(error); });
}
