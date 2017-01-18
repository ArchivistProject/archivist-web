import config from '~/config';

export function fetchItems() {
    return fetch(`${config.backend}/documents`)
        .then(response => response.json())
        .catch(response => console.log('error', response));
}
