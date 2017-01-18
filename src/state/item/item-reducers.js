import itemActionTypes from './item-action-types';

const initialState = {
    items: null,
    headers: [
        'Title',
        'Author',
        'Date Added',
    ],
    activeItemId: null,
    activeItem: null,
    sortBy: null,
    meta: {
        currentPage: null,
        nextPage: null,
        prevPage: null,
        totalPages: null,
    },
};

export default function (state = initialState, action) {
    switch (action.type) {
        case itemActionTypes.FETCH_ITEMS_SUCCEEDED: {
            const { documents: items, meta } = action.data;
            const { current_page: currentPage, next_page: nextPage, prev_page: prevPage, total_pages: totalPages } = meta;
            return {
                ...state,
                items,
                meta: {
                    currentPage,
                    nextPage,
                    prevPage,
                    totalPages,
                },
            };
        }

        case itemActionTypes.FETCH_HEADERS_SUCCEEDED: { // TODO
            const { headers } = action.data;
            return {
                ...state,
                headers,
            };
        }

        case itemActionTypes.ITEM_FOCUSED: {
            const { itemId } = action.data;
            return {
                ...state,
                activeItemId: itemId,
                activeItem: state.items[itemId],
            };
        }

        case itemActionTypes.HEADER_CLICKED: { // TODO
            const { header } = action.data;
            return {
                ...state,
                sortby: header,
            };
        }
    }
    return state;
}
