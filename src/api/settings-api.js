import { ajax } from '~/src/utils/utils';

export function fetchItemTypes() {
    return ajax('GET', 'system/groups')
        .then(response => response)
        .catch((error) => { throw new Error(error); });
}


export function postItemType(itemName) {
    const group = {
        group: {
            name: itemName,
            fields: [],
        },
    };
    return ajax('POST', 'system/groups', group)
        .then(response => response);
}

export function postFieldType(name, type, id) {
    const field = {
        field: {
            name,
            type,
        },
    };
    return ajax('POST', `system/groups/${id}/field`, field)
        .then(response => response);
}


export function deleteField(groupID, fieldID) {
    return ajax('DELETE', `system/groups/${groupID}/field/${fieldID}`)
        .then(response => response);
}


export function deleteItem(groupID) {
  return ajax('DELETE', `system/groups/${groupID}`)
      .then(response => response);
}


export function postBackgroundColor(color) {
    const backgroundColor = {
        color: {
            name: color,
        },
    };

    ajax('POST', `${config.backend}/theURL`, backgroundColor);
}

// -------------------------Api token----------------------------------
export function fetchAPIToken() {
    return ajax('GET', 'theURL')
        .then(response => response)
        .catch((error) => { throw new Error(error); });
}


// --------------------------Statistic--------------------

export function fetchFileStorage() {
    return ajax('GET', 'statistics/documents')
        .then(response => response)
        .catch((error) => { throw new Error(error); });
}
