import searchActionTypes from './search-action-types';
import { SEARCH_CONSTANTS } from './search-constants';

const initialState = {
    // searchGroups: [],
    searchGroups: [],
    // itemTypeGroups: [],
    // metadataGroups: [],
    // tagGroups: [],
    // descriptionGroups: [],
    // metadataRows: [],
    // selectedTags: [],
    // descriptionInput: '',
    // selectedItemType: null,
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

function getGroupsOfType(state, groupType) {
    switch (groupType) {
        case SEARCH_CONSTANTS.ITEM_TYPE:
            return state.itemTypeGroups;
        case SEARCH_CONSTANTS.METADATA:
            return state.metadataGroups;
        case SEARCH_CONSTANTS.TAG:
            return state.tagGroups;
        case SEARCH_CONSTANTS.DESCRIPTION:
            return state.descriptionGroups;
    }
    return [];
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
                itemTypes: [],
            };
        case SEARCH_CONSTANTS.METADATA:
            return {
                ...genericGroup,
                groupType: SEARCH_CONSTANTS.METADATA,
                metadataRows: [],
            };
        case SEARCH_CONSTANTS.TAG:
            return {
                ...genericGroup,
                groupType: SEARCH_CONSTANTS.TAG,
                tags: [],
            };
        case SEARCH_CONSTANTS.DESCRIPTION:
            return {
                ...genericGroup,
                groupType: SEARCH_CONSTANTS.DESCRIPTION,
                description: '',
            };
    }
    return {};
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
            // const groups = getGroupsOfType(state, groupType);
            const searchGroups = updateGroupValue(state.searchGroups, groupIndex, 'not', !state.searchGroups[groupIndex].not);
            return {
                ...state,
                searchGroups,
            };
        }

        case searchActionTypes.ITEM_TYPE_ROW_ADDED: {
            const { groupIndex } = action.data;
            const { searchGroups } = state;
            const updatedItemTypes = searchGroups[groupIndex].itemTypes.slice(0);
            updatedItemTypes.push('all');
            return {
                ...state,
                searchGroups: [
                    ...searchGroups.slice(0, groupIndex),
                    {
                        ...searchGroups[groupIndex],
                        itemTypes: updatedItemTypes,
                    },
                    ...searchGroups.slice(groupIndex + 1, searchGroups.length),
                ],
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
            const updatedGroups = updateGroupValue(searchGroups, groupIndex, 'itemTypes', updatedItemTypes);
            return {
                ...state,
                searchGroups: updatedGroups,
            };
        }

        case searchActionTypes.METADATA_ROW_ADDED: {
            const metadataRows = state.metadataRows.slice(0);
            metadataRows.push({
                field: {
                    id: 1,
                    name: null,
                    type: null,
                },
                value: '',
            });
            return {
                ...state,
                metadataRows,
            };
        }
        case searchActionTypes.METADATA_ROW_FIELD_UPDATED: {
            const { rowIndex, field } = action.data;
            const { metadataRows } = state;
            const { value } = metadataRows[rowIndex];
            return {
                ...state,
                metadataRows: [
                    ...metadataRows.slice(0, rowIndex),
                    {
                        field,
                        value,
                    },
                    ...metadataRows.slice(rowIndex + 1, metadataRows.length),
                ],
            };
        }
        case searchActionTypes.METADATA_ROW_VALUE_UPDATED: {
            const { rowIndex, value } = action.data;
            const { metadataRows } = state;
            const { field } = metadataRows[rowIndex];
            return {
                ...state,
                metadataRows: [
                    ...metadataRows.slice(0, rowIndex),
                    {
                        field,
                        value,
                    },
                    ...metadataRows.slice(rowIndex + 1, metadataRows.length),
                ],
            };
        }
        case searchActionTypes.METADATA_ROW_DELETED: {
            const { rowIndex } = action.data;
            const { metadataRows } = state;
            return {
                ...state,
                metadataRows: [
                    ...metadataRows.slice(0, rowIndex),
                    ...metadataRows.slice(rowIndex + 1, metadataRows.length),
                ],
            };
        }
    }
    return state;
}
