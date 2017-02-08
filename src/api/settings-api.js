import config from '~/config';
import $ from 'jquery';

export function fetchItemTypes() {
    return fetch(`${config.backend}/system/groups`)
        .then(response => response.json())
        .catch((error) => { throw new Error(error); });
}


export function postItemType(itemName) {
    const group = {
        "group": {
            "name": itemName,
            "fields": []
        }
    };
    return $.post(`${config.backend}/system/groups`, group)
        .then(response => response)
}

export function postFieldType(name, type, id) {
    const field = {
        "field": {
            "name": name,
            "type": type
        }
    };
    return $.post(`${config.backend}/system/groups/` + id + '/field', field)
        .then(response => response)
}


export function deleteField(groupID, fieldID) {
    return $.remove(`${config.backend}/system/groups/` + groupID + '/field/' + fieldID)
        .then(response => response)
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
