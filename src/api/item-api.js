import config from '~/config';
import $ from 'jquery';

export function fetchItems(pageNumber) {
    return fetch(`${config.backend}/documents?page=${pageNumber}`)
        .then(response => response.json())
        .catch((error) => { throw new Error(error); });
}

export function updateItemMetadata(item) {
    const payload = {
        documentId: item.id,
        metadata_fields: item.metadata_fields,
    };
    $.post(`${config.backend}/theurl`, payload);
}
