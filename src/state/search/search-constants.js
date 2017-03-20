export const SEARCH_CONSTANTS = {
    AND: 'and',
    OR: 'or',
    ITEM_TYPE: 'Item Types',
    METADATA: 'Metadata',
    TAG: 'Tags',
    DESCRIPTION: 'Description',
};

export const SEARCH_DEFAULTS = {
    ITEM_TYPE: 'Select Item Type',
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
};
