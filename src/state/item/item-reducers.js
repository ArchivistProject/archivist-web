import itemActionTypes from './item-action-types';

const initialState = {
    items: [ // these are placeholders
        {
            title: 'Newspaper Article',
            dateAdded: '11/29/16',
            author: 'Some Author',
            publication: 'The New York Times',
        },
        {
            title: 'Research Paper',
            dateAdded: '4/16/12',
            author: 'Dr. Author',
            field: 'Biology',
        },
        {
            title: 'Magazine Article',
            dateAdded: '1/6/09',
            author: 'Another Author',
            someMetadata: 'aaa',
        },
        {
            title: 'Interesting Website',
            dateAdded: '5/10/13',
            author: '',
            extraData: 'something',
        },
        {
            title: 'Title 1',
            dateAdded: '4/5/11',
            author: 'Author 1',
            someMetadata: 'aaa',
        },
        {
            title: 'Title 2',
            dateAdded: '7/24/15',
            author: 'Author 2',
            extraData: 'something',
        },
        {
            title: 'Title 3',
            dateAdded: '9/11/13',
            author: '',
            someMetadata: 'aaa',
        },
        {
            title: 'Title 4',
            dateAdded: '8/21/07',
            author: 'Author 4',
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
};

export default function (state = initialState, action) {
    switch (action.type) {
        case itemActionTypes.FETCH_ITEMS_SUCCEEDED: {
            const { items } = action.data;
            return {
                ...state,
                items,
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
    }
    return state;
}
