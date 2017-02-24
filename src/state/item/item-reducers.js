import itemActionTypes from './item-action-types';
import sidebarActionTypes from '../sidebar/sidebar-action-types';

const initialState = {
    items: null,
    headers: [ // hard-coded for now
        'Title',
        'Author',
        'Date Added',
    ],
    activeItem: null,
    activeItemEditing: null,
    activeItemIndex: null,
    activeItemIndexCached: null, // saves the index of active item on different page
    activeItemPage: null,
    sortBy: null,
    waitingForItems: null,
    fetchItemsFailed: false,
    meta: {
        currentPage: 1,
        nextPage: null,
        prevPage: null,
        totalPages: null,
        totalCount: null,
        pageSize: 10,
    },
    tempDescription: '',
};

export default function (state = initialState, action) {
    switch (action.type) {
        case itemActionTypes.ITEMS_REQUESTED:
        case itemActionTypes.ITEM_REQUESTED: {
            return {
                ...state,
                waitingForItems: true,
            };
        }

        case itemActionTypes.FETCH_ITEMS_SUCCEEDED: {
            const { documents: items, meta } = action.data;
            const { activeItem, activeItemIndexCached, activeItemPage } = state;
            const { current_page: currentPage,
                    next_page: nextPage,
                    prev_page: prevPage,
                    total_pages: totalPages,
                    total_count: totalCount,
                    // page_size: pageSize, // if we get page size from server
            } = meta;

            return {
                ...state,
                items,
                activeItemIndex: activeItemPage === currentPage ? activeItemIndexCached : null,
                waitingForItems: false,
                fetchItemsFailed: false,
                meta: {
                    ...state.meta,
                    currentPage,
                    nextPage,
                    prevPage,
                    totalPages,
                    totalCount,
                    // pageSize,
                },
            };
        }

        case itemActionTypes.FETCH_ITEMS_FAILED: {
            console.log('error fetching items..');
            return {
                ...state,
                waitingForItems: false,
                fetchItemsFailed: true,
            };
        }
        case itemActionTypes.FETCH_ITEM_SUCCEEDED: {
            const { document } = action.data;
            return {
                ...state,
                activeItem: document,
                activeItemEditing: document,
            };
        }

        case itemActionTypes.FETCH_HEADERS_SUCCEEDED: { // TODO, if we fetch headers
            const { headers } = action.data;
            return {
                ...state,
                headers,
            };
        }

        case itemActionTypes.ITEM_FOCUSED: {
            const { itemIndex } = action.data;
            const { meta: { currentPage } } = state;
            return {
                ...state,
                activeItem: state.items[itemIndex],
                activeItemEditing: state.items[itemIndex],
                activeItemIndex: itemIndex,
                activeItemIndexCached: itemIndex,
                activeItemPage: currentPage,
            };
        }

        case itemActionTypes.METADATA_UPDATED: {
            const { metadataIndex, value } = action.data;
            const { metadata_fields, metadata_fields: { [metadataIndex]: metadataField } } = state.activeItemEditing;

            return {
                ...state,
                activeItemEditing: {
                    ...state.activeItemEditing,
                    metadata_fields: [
                        ...metadata_fields.slice(0, metadataIndex),
                        { ...metadataField, data: value },
                        ...metadata_fields.slice(metadataIndex + 1, metadata_fields.length),
                    ],
                },
            };
        }

        case itemActionTypes.METADATA_SAVE_SUCCEEDED: {
            return {
                ...state,
            };
        }

        case itemActionTypes.TAGS_UPDATED: {
            const { tags } = action.data;
            const { activeItem } = state;
            return {
                ...state,
                activeItem: {
                    ...activeItem,
                    tags,
                },
            };
        }

        case itemActionTypes.DESCRIPTION_UPDATED: {
            const { description, tempDescription } = action.data;
            const { activeItem } = state;
            return {
                ...state,
                activeItem: {
                    ...activeItem,
                    description,
                },
                tempDescription: tempDescription || state.tempDescription,
            };
        }

        case itemActionTypes.DESCRIPTION_UPDATE_SUCCEEDED: {
            return {
                ...state,
                tempDescription: state.activeItem.description,
            };
        }

        case itemActionTypes.HEADER_CLICKED: { // TODO, if we add heading sorting
            const { header } = action.data;
            return {
                ...state,
                sortby: header,
            };
        }

        case sidebarActionTypes.VISIBILITY_UPDATED: {
            const { visible } = action.data;

            if (!visible) { // closing sidebar, unfocus item
                return {
                    ...state,
                    activeItem: initialState.activeItem,
                    activeItemIndex: initialState.activeItemIndex,
                    activeItemIndexCached: initialState.activeItemIndexCached,
                    activeItemPage: initialState.activeItemPage,
                };
            }

            return { // opening sidebar, keep item focused
                ...state,
            };
        }

        case sidebarActionTypes.EDIT_MODE_TOGGLED: {
            return {
                ...state,
                activeItemEditing: state.activeItem,
            };
        }
    }
    return state;
}
