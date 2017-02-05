import config from '~/config';

export function uploadFile(file) {
    return fetch('theurl', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            file,
        }),
    })
        .then(response => response.json());
}

export function fetchItemTypes() {
    return fetch(`${config.backend}/system/groups`)
        .then(response => response.json())
        .catch(response => console.log('error', response));
}
