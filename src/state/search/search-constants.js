export const SEARCH_CONSTANTS = {
    AND: 'and',
    OR: 'or',
    ITEM_TYPE: 'Category',
    METADATA: 'Metadata',
    TAG: 'Tags',
    DESCRIPTION: 'Description',
    FULLTEXT: 'Full Text',
};

export const SEARCH_DEFAULTS = {
    ITEM_TYPE: 'Select Category',
    METADATA: {
        itemType: undefined,
        field: {
            id: undefined,
            name: null,
            type: null,
        },
        value: '',
    },
    TAG: [],
    DESCRIPTION: '',
    FULLTEXT: '',
};
