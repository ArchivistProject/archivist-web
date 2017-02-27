import { ajax } from '~/src/utils/utils';

export function fetchItems(pageNumber) {
    return ajax('GET', `documents?page=${pageNumber}`);
}

export function fetchItem(itemId) {
    return ajax('GET', `documents/${itemId}`);
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
        calls.push(ajax('PUT', `metadata_fields/${field.id}`, payload).promise);
    });
    return $.when(...calls)
        .then(() => true)
        .catch(() => false);
}

export function updateTags(item, tags) {
    const payload = { document: { tags, count: tags.length } };
    return ajax('PUT', `documents/${item.id}`, payload);
}

export function updateDescription(item) {
    const payload = { document: { description: item.description } };
    return ajax('PUT', `documents/${item.id}`, payload);
}
