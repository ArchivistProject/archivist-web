import { ajax } from '~/src/utils/utils';
import config from '~/config';
import $ from 'jquery';
import { CONTENT_TYPES } from '~/src/state/viewer/viewer-constants';
import { APP_CONSTANTS } from '~/src/utils/app-constants';
import { buildSearchPayload } from '~/src/api/search-api';
import { store } from '~/src/index';

export function fetchItems(pageNumber) {
    const { sortOrder, sortBy } = store.getState().item;
    const searchGroups = store.getState().search.searchGroups;

    const params = `page=${pageNumber}&sort_order=${sortOrder}&sort_column=${sortBy}`;
    if (searchGroups.length === 0) {
        return ajax('GET', `documents?${params}`);
    }

    const payload = {
        search: buildSearchPayload(searchGroups),
    };
    return ajax('POST', `documents/search?${params}`, payload);
}

export function fetchItem(itemId) {
    return ajax('GET', `documents/${itemId}`);
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
        xhr.setRequestHeader('Authorization', localStorage.getItem(APP_CONSTANTS.AUTH_TOKEN));
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
        calls.push(ajax('PUT', `metadata_fields/${field.id}`, payload));
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

export function addNote(item, highlighter, highlightId, text, note) {
    const payload = { note: { highlighter, highlightId, text, note } };
    return ajax('POST', `documents/${item.id}/notes`, payload);
}

export function editNote(item, id, note) {
    const payload = { note: { note } };
    return ajax('PUT', `documents/${item.id}/notes/${id}`, payload);
}

export function deleteNote(item, highlighter, highlightId, id) {
    const payload = { note: { highlighter, highlightId } };
    return ajax('DELETE', `documents/${item.id}/notes/${id}`, payload);
}
