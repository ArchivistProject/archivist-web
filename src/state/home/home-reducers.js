import homeActionTypes from './home-action-types';

const initialState = {
    items: [ // these are placeholders
        {
            title: 'Title 1',
            dateAdded: '11/12/16',
            author: 'Author 1',
            someMetadata: 'aaa',
        },
        {
            title: 'Title 2',
            dateAdded: '11/16/16',
            author: 'Author 2',
            extraData: 'something',
        },
    ],
    headers: [
        {
            key: 'title',
            heading: 'Title',
        },
        {
            key: 'dateAdded',
            heading: 'Date Added',
        },
        {
            key: 'author',
            heading: 'Author',
        },
    ],
    activeItemId: null,
    activeItem: null,
    sidebarVisible: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case homeActionTypes.FETCH_ITEMS_SUCCEEDED: {
            const { items } = action.data;
            return {
                ...state,
                items,
            };
        }
        case homeActionTypes.ITEM_FOCUSED: {
            const { itemId } = action.data;
            return {
                ...state,
                activeItemId: itemId,
                activeItem: state.items[itemId],
                sidebarVisible: true,
            };
        }
    }
    return state;
}
