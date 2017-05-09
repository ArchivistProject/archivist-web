import { push } from 'react-router-redux';
import pdflib from 'pdfjs-dist';
import worker from 'pdfjs-dist/build/pdf.worker';
import * as itemApi from '~/src/api/item-api';
import { CONTENT_TYPES } from '~/src/state/viewer/viewer-constants';
import { handleError } from '~/src/utils/utils';
import itemActionTypes from './item-action-types';
import sidebarActionTypes from '../sidebar/sidebar-action-types';
import viewerActionTypes from '../viewer/viewer-action-types';

export function fetchItems(currentPage) {
    return (dispatch, getState) => {
        dispatch(push(`?page=${currentPage}`));
        dispatch({
            type: itemActionTypes.ITEMS_REQUESTED,
        });
        itemApi.fetchItems(currentPage)
            .then(response => dispatch({
                type: itemActionTypes.FETCH_ITEMS_SUCCEEDED,
                data: response,
            }))
            .catch((error) => {
                dispatch({ type: itemActionTypes.FETCH_ITEMS_FAILED });
                handleError(error, dispatch);
            });
    };
}

export function fetchItem(itemId) {
    return (dispatch) => {
        dispatch({
            type: itemActionTypes.ITEM_REQUESTED,
        });
        itemApi.fetchItem(itemId)
            .then(response => dispatch({
                type: itemActionTypes.FETCH_ITEM_SUCCEEDED,
                data: response,
            }))
            .catch(error => dispatch({ type: itemActionTypes.FETCH_ITEM_FAILED }));
    };
}

export function fetchItemContent(item) {
    return (dispatch) => {
        dispatch({
            type: itemActionTypes.ITEM_CONTENT_REQUESTED,
        });
        itemApi.fetchItemContent(item)
            .then((response) => {
                const { content, contentType } = response;
                switch (contentType) {
                    case CONTENT_TYPES.PDF:
                        pdflib.PDFJS.workerSrc = worker;
                        pdflib.PDFJS.getDocument({ data: content }).then((pdf) => {
                            dispatch({
                                type: itemActionTypes.FETCH_CONTENT_SUCCEEDED,
                                data: { content: pdf, contentType },
                            });
                        });
                        break;
                    case CONTENT_TYPES.WEB:
                        dispatch({
                            type: itemActionTypes.FETCH_CONTENT_SUCCEEDED,
                            data: { content, contentType },
                        });
                        break;
                }
            })
            .catch(error => dispatch({ type: itemActionTypes.FETCH_CONTENT_FAILED }));
    };
}

export function fetchHeaders() {
    return (dispatch) => {
        itemApi.fetchHeaders()
            .then(response => dispatch({
                type: itemActionTypes.FETCH_HEADERS_SUCCEEDED,
                data: response,
            }))
            .catch((error) => {
                dispatch({ type: itemActionTypes.FETCH_HEADERS_FAILED });
                handleError(error, dispatch);
            });
    };
}

export function itemFocused(itemIndex) {
    return (dispatch, getState) => {
        const { item, sidebar } = getState();
        const itemId = item.items[itemIndex].id;
        if (item.activeItemIndex !== itemIndex || item.activeItem.id !== itemId) {
            dispatch({
                type: itemActionTypes.ITEM_FOCUSED,
                data: { itemIndex },
            });
            dispatch(fetchItem(itemId));
            if (!sidebar.visible) {
                dispatch({
                    type: sidebarActionTypes.VISIBILITY_UPDATED,
                    data: { visible: true },
                });
            }
        } else {
            dispatch({
                type: viewerActionTypes.VIEWER_OPENED,
            });
            dispatch(push(`items/${itemId}`));
        }
    };
}

export function updateMetadata(metadataIndex, value) {
    return {
        type: itemActionTypes.METADATA_UPDATED,
        data: { metadataIndex, value },
    };
}

export function saveMetadata() {
    return (dispatch, getState) => {
        const { item: { activeItem, activeItemEditing, meta: { currentPage } } } = getState();
        itemApi.updateItemMetadata(activeItem, activeItemEditing)
            .then((success) => {
                dispatch({ type: itemActionTypes.METADATA_UPDATE_SUCCEEDED });
                dispatch(fetchItem(activeItem.id));
            })
            .catch(error => dispatch({ type: itemActionTypes.METADATA_UPDATE_FAILED }));
    };
}

export function saveTags(tags) {
    return (dispatch, getState) => {
        const tagSet = new Set(tags);
        const tagArray = Array.from(tagSet.values());
        dispatch({
            type: itemActionTypes.TAGS_UPDATED,
            data: { tags: tagArray },
        });

        const { item: { activeItem } } = getState();
        itemApi.updateTags(activeItem, tags)
            .then((response) => {
                dispatch({ type: itemActionTypes.TAGS_UPDATE_SUCCEEDED });
                // Updating the activeItem with TAGS_UPDATED, so no need to call fetchItem
            })
            .catch(error => dispatch({ type: itemActionTypes.TAGS_UPDATE_FAILED }));
    };
}

export function updateDescription(description) {
    return {
        type: itemActionTypes.DESCRIPTION_UPDATED,
        data: { description },
    };
}

export function saveDescription() {
    return (dispatch, getState) => {
        const { item: { activeItemEditing } } = getState();
        itemApi.updateDescription(activeItemEditing)
            .then((response) => {
                dispatch({ type: itemActionTypes.DESCRIPTION_UPDATE_SUCCEEDED });
                dispatch(fetchItem(activeItemEditing.id));
            })
            .catch(error => dispatch({ type: itemActionTypes.DESCRIPTION_UPDATE_FAILED }));
    };
}

export function saveSortOrder(sort) {
    return {
        type: itemActionTypes.SORT_ORDER_CHANGED,
        data: { sort },
    };
}

export function saveHeaderClicked(header) {
    return {
        type: itemActionTypes.HEADER_CLICKED,
        data: { header },
    };
}
