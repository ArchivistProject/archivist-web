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
