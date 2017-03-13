import config from '~/config';
import $ from 'jquery';
import { CONTENT_TYPES } from '~/src/state/viewer/viewer-constants';

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

export function fetchItemContent(item) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${config.backend}/documents/${item.id}/content`, true);
        xhr.onload = () => {
            const contentType = xhr.getResponseHeader('Content-Type');
            const { response: content } = xhr;
            resolve({
                content,
                contentType,
            });
        };
        xhr.onerror = () => {
            reject();
        };
        if (item.content_type === CONTENT_TYPES.PDF) {
            xhr.responseType = 'arraybuffer';
        }
        xhr.send();
    });
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
        }));
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
