export function fetchItems() {
    return fetch('theurl')
        .then(response => response.json());
}
