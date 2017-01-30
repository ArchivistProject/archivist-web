import config from '~/config';

export function fetchItemType() {
    return fetch(`${config.backend}/documents/:id(.:format)`)
        .then(response => response.json())
        .catch((error) => { throw new Error(error); });
}