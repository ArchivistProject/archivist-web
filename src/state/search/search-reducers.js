import searchActionTypes from './search-action-types';
import { SEARCH_CONSTANTS, SEARCH_DEFAULTS } from './search-constants';

const initialState = {
    searchGroups: [],
};

function updateGroupValue(groups, groupIndex, property, value) {
    return [
        ...groups.slice(0, groupIndex),
        {
            ...groups[groupIndex],
            [property]: value,
        },
        ...groups.slice(groupIndex + 1, groups.length),
    ];
}

function getDefaultGroupObject(groupType) {
    const genericGroup = {
        andOr: SEARCH_CONSTANTS.AND,
        not: false,
    };
    switch (groupType) {
        case SEARCH_CONSTANTS.ITEM_TYPE:
            return {
                ...genericGroup,
                groupType: SEARCH_CONSTANTS.ITEM_TYPE,
                itemTypes: [SEARCH_DEFAULTS.ITEM_TYPE],
            };
        case SEARCH_CONSTANTS.METADATA:
            return {
                ...genericGroup,
                groupType: SEARCH_CONSTANTS.METADATA,
                metadataRows: [SEARCH_DEFAULTS.METADATA],
            };
        case SEARCH_CONSTANTS.TAG:
            return {
                ...genericGroup,
                groupType: SEARCH_CONSTANTS.TAG,
                tags: SEARCH_DEFAULTS.TAG,
            };
        case SEARCH_CONSTANTS.DESCRIPTION:
            return {
                ...genericGroup,
                groupType: SEARCH_CONSTANTS.DESCRIPTION,
                description: SEARCH_DEFAULTS.DESCRIPTION,
            };
    }
    return genericGroup;
}

export default function (state = initialState, action) {
    switch (action.type) {

        case searchActionTypes.SEARCH_GROUP_ADDED: {
            const { groupType } = action.data;
            const newGroup = getDefaultGroupObject(groupType);
            return {
                ...state,
                searchGroups: [
                    ...state.searchGroups,
                    newGroup,
                ],
            };
        }

        case searchActionTypes.SEARCH_GROUP_DELETED: {
            const { groupIndex } = action.data;
            const { searchGroups } = state;
            return {
                ...state,
                searchGroups: [
                    ...searchGroups.slice(0, groupIndex),
                    ...searchGroups.slice(groupIndex + 1, searchGroups.length),
                ],
            };
        }

        case searchActionTypes.GROUP_AND_OR_CHANGED: {
            const { groupIndex } = action.data;
            const value = state.searchGroups[groupIndex].andOr === SEARCH_CONSTANTS.AND ? SEARCH_CONSTANTS.OR : SEARCH_CONSTANTS.AND;
            const searchGroups = updateGroupValue(state.searchGroups, groupIndex, 'andOr', value);
            return {
                ...state,
                searchGroups,
            };
        }

        case searchActionTypes.GROUP_NOT_CHANGED: {
            const { groupIndex } = action.data;
            const searchGroups = updateGroupValue(state.searchGroups, groupIndex, 'not', !state.searchGroups[groupIndex].not);
            return {
                ...state,
                searchGroups,
            };
        }

        case searchActionTypes.ITEM_TYPE_ROW_ADDED: {
            const { groupIndex } = action.data;
            const { searchGroups } = state;

            return {
                ...state,
                searchGroups: [
                    ...searchGroups.slice(0, groupIndex),
                    {
                        ...searchGroups[groupIndex],
                        itemTypes: [...searchGroups[groupIndex].itemTypes, SEARCH_DEFAULTS.ITEM_TYPE],
                    },
                    ...searchGroups.slice(groupIndex + 1, searchGroups.length),
                ],
            };
        }

        case searchActionTypes.ITEM_TYPE_ROW_DELETED: {
            const { groupIndex, itemTypeIndex } = action.data;
            const { searchGroups } = state;
            const { itemTypes } = searchGroups[groupIndex];
            const updatedItemTypes = [
                ...itemTypes.slice(0, itemTypeIndex),
                ...itemTypes.slice(itemTypeIndex + 1, itemTypes.length),
            ];

            return {
                ...state,
                searchGroups: updateGroupValue(searchGroups, groupIndex, 'itemTypes', updatedItemTypes),
            };
        }

        case searchActionTypes.ITEM_TYPE_SELECTED: {
            const { itemType, itemTypeIndex, groupIndex } = action.data;
            const { searchGroups } = state;
            const { itemTypes } = searchGroups[groupIndex];
            const updatedItemTypes = [
                ...itemTypes.slice(0, itemTypeIndex),
                itemType,
                ...itemTypes.slice(itemTypeIndex + 1, itemTypes.length),
            ];

            return {
                ...state,
                searchGroups: updateGroupValue(searchGroups, groupIndex, 'itemTypes', updatedItemTypes),
            };
        }

        case searchActionTypes.METADATA_ROW_ADDED: {
            const { groupIndex } = action.data;
            const { searchGroups } = state;
            return {
                ...state,
                searchGroups: [
                    ...searchGroups.slice(0, groupIndex),
                    {
                        ...searchGroups[groupIndex],
                        metadataRows: [...searchGroups[groupIndex].metadataRows, SEARCH_DEFAULTS.METADATA],
                    },
                    ...searchGroups.slice(groupIndex + 1, searchGroups.length),
                ],
            };
        }

        case searchActionTypes.METADATA_ROW_FIELD_UPDATED: {
            const { field, rowIndex, groupIndex } = action.data;
            const { searchGroups } = state;
            const { metadataRows } = searchGroups[groupIndex];
            const updatedMetadataRows = updateGroupValue(metadataRows, rowIndex, 'field', field);
            return {
                ...state,
                searchGroups: updateGroupValue(searchGroups, groupIndex, 'metadataRows', updatedMetadataRows),
            };
        }

        case searchActionTypes.METADATA_ROW_VALUE_UPDATED: {
            const { value, rowIndex, groupIndex } = action.data;
            const { searchGroups } = state;
            const { metadataRows } = searchGroups[groupIndex];
            const updatedMetadataRows = updateGroupValue(metadataRows, rowIndex, 'value', value);
            return {
                ...state,
                searchGroups: updateGroupValue(searchGroups, groupIndex, 'metadataRows', updatedMetadataRows),
            };
        }

        case searchActionTypes.METADATA_ROW_DELETED: {
            const { rowIndex, groupIndex } = action.data;
            const { searchGroups } = state;
            const { metadataRows } = searchGroups[groupIndex];
            const updatedMetadataRows = [
                ...metadataRows.slice(0, rowIndex),
                ...metadataRows.slice(rowIndex + 1, metadataRows.length),
            ];

            return {
                ...state,
                searchGroups: updateGroupValue(searchGroups, groupIndex, 'metadataRows', updatedMetadataRows),
            };
        }

        case searchActionTypes.TAGS_UPDATED: {
            const { tags, groupIndex } = action.data;
            const { searchGroups } = state;
            return {
                ...state,
                searchGroups: updateGroupValue(searchGroups, groupIndex, 'tags', tags),
            };
        }

        case searchActionTypes.DESCRIPTION_UPDATED: {
            const { description, groupIndex } = action.data;
            const { searchGroups } = state;
            return {
                ...state,
                searchGroups: updateGroupValue(searchGroups, groupIndex, 'description', description),
            };
        }
    }
    return state;
}
