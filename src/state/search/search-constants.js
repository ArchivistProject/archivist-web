export const SEARCH_CONSTANTS = {
    AND: 'and',
    OR: 'or',
    ITEM_TYPE: 'Item Types',
    METADATA: 'Metadata',
    TAG: 'Tags',
    DESCRIPTION: 'Description',
};

export const SEARCH_DEFAULTS = {
    ITEM_TYPE: 'all',
    METADATA: {
        field: {
            id: 1,
            name: null,
            type: null,
        },
        value: '',
    },
    TAG: [],
    DESCRIPTION: '',
};
