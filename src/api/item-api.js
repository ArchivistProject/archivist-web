import config from '~/config';

export function fetchItems(pageNumber) {
    return fetch(`${config.backend}/documents?page=${pageNumber}`)
        .then(response => response.json())
        .catch((error) => { throw new Error(error); });
}

export function updateItemMetadata(item) {
    return fetch(`${config.backend}/theurl`)
        .then(response => response.json())
        .catch((error) => { throw new Error(error); });
}
