import config from '~/config';

export function fetchItemType() {
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