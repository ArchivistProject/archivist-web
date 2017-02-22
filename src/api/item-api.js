import config from '~/config';
import $ from 'jquery';

export function fetchItems(pageNumber) {
    return fetch(`${config.backend}/documents?page=${pageNumber}`)
        .then(response => response.json())
        .catch((error) => { throw new Error(error); });
}

export function fetchItem(itemId) {
    return fetch(`${config.backend}/documents/${itemId}`)
        .then(response => response.json())
        .catch((error) => { throw new Error('Item fetch failed', error); });
}

export function updateItemMetadata(item, updatedItem) {
    const changedFields = updatedItem.metadata_fields.filter((field, i) => field.data !== item.metadata_fields[i].data);
    const calls = [];
    changedFields.forEach((field) => {
        const payload = {
            metadata_field: {
                data: field.data,
            },
        };
        calls.push($.ajax({
            type: 'PUT',
            url: `${config.backend}/metadata_fields/${field.id}`,
            data: payload,
        }).promise);
    });
    return $.when(...calls)
        .then(() => true)
        .catch(() => false);
}

export function getTags(itemId) {
    return fetch(`${config.backend}/documents/${itemId}/tags`)
        .then(response => response.json())
        .catch((error) => { throw new Error('Error fetching tags', error); });
}

export function getDescription(itemId) {
    return fetch(`${config.backend}/documents/${itemId}/description`)
        .then(response => response.json())
        .catch((error) => { throw new Error('Error fetching description', error); });
}

export function updateTags(item, tags) {
    const payload = { document: { tags, count: tags.length } };
    return $.ajax({
        type: 'PUT',
        url: `${config.backend}/documents/${item.id}/tags`,
        data: payload,
    });
}

export function updateDescription(item) {
    const payload = { document: { description: item.description } };
    return $.ajax({
        type: 'PUT',
        url: `${config.backend}/documents/${item.id}/description`,
        data: payload,
    });
}
