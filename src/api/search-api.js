import config from '~/config';
import { ajax } from '~/src/utils/utils';
import { SEARCH_CONSTANTS } from '~/src/state/search/search-constants';

export function search(searchGroups) {
    const searchPayload = Object.keys(searchGroups).map((index) => {
        const searchGroup = searchGroups[index];
        switch (searchGroup.groupType) {
            case (SEARCH_CONSTANTS.ITEM_TYPE): {
                return {
                    groupType: 'ItemTypes',
                    andOr: searchGroup.andOr,
                    not: searchGroup.not,
                    item_types: searchGroup.itemTypes,
                };
            }
            case (SEARCH_CONSTANTS.METADATA): {
                return {
                    groupType: searchGroup.groupType,
                    andOr: searchGroup.andOr,
                    not: searchGroup.not,
                    fields: searchGroup.metadataRows.map((metadataRow) => {
                        const name = metadataRow.field.name;
                        const type = metadataRow.field.type;
                        const group = metadataRow.itemType;
                        const data = metadataRow.value;
                        return {
                            name,
                            type,
                            group,
                            data,
                        };
                    }),
                };
            }
            case (SEARCH_CONSTANTS.TAG): {
                return {
                    ...searchGroup,
                };
            }
            case (SEARCH_CONSTANTS.DESCRIPTION): {
                return {
                    ...searchGroup,
                };
            }
        }
        return null;
    });
    const payload = {
        search: searchPayload,
    };
    return ajax('POST', 'documents/search', payload);
}