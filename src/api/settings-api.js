import { ajax } from '~/src/utils/utils';

export function fetchItemTypes() {
    return ajax('GET', 'system/groups');
}

export function postItemType(itemName) {
    const group = {
        group: {
            name: itemName,
            fields: [],
        },
    };
    return ajax('POST', 'system/groups', group);
}

export function postFieldType(name, type, id) {
    const field = {
        field: {
            name,
            type,
        },
    };
    return ajax('POST', `system/groups/${id}/field`, field);
}


export function deleteField(groupID, fieldID) {
    return ajax('DELETE', `system/groups/${groupID}/field/${fieldID}`);
}


export function deleteItem(groupID) {
    return ajax('DELETE', `system/groups/${groupID}`);
}

// -------------------------Api token----------------------------------
export function fetchAPIToken() {
    return ajax('GET', 'theURL'); // TODO
}


// --------------------------Statistic--------------------

export function fetchFileStorage() {
    return ajax('GET', 'statistics/documents');
}
