import config from '~/config';
import $ from 'jquery';

export function fetchItems(pageNumber) {
    return fetch(`${config.backend}/documents?page=${pageNumber}`)
        .then(response => response.json())
        .catch((error) => { throw new Error(error); });
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

export function updateTags(item, tags) {
    const payload = { document: { tags, count: tags.length } };
    return $.ajax({
        type: 'PUT',
        url: `${config.backend}/documents/${item.id}`,
        data: payload,
    });
}

export function updateDescription(item) {
    const payload = { document: { description: item.description } };
    return $.ajax({
        type: 'PUT',
        url: `${config.backend}/documents/${item.id}`,
        data: payload,
    });
}
