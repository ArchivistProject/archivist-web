import config from '~/config';

export function fetchItems(pageNumber) {
    return fetch(`${config.backend}/documents?page=${pageNumber}`)
        .then(response => response.json())
        .catch(response => console.log('error', response));
}
