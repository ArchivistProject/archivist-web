import config from '~/config';
import $ from 'jquery';
import { SEARCH_CONSTANTS } from '~/src/state/search/search-constants';

export function search(searchGroups) {
    const searchPayload = Object.keys(searchGroups).map(index => {
        const searchGroup = searchGroups[index];
        switch(searchGroup.groupType) {
            case (SEARCH_CONSTANTS.ITEM_TYPE): {
                return {
                    groupType: searchGroup.groupType,
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
                        return {
                            name: metadataRow.field.name,
                            type: metadataRow.itemType,
                            data: metadataRow.value,
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
    });
    const payload = {
        search: searchPayload,
    };
    return $.ajax({
        url: `${config.backend}/documents/search`,
        type: 'POST',
        data: JSON.stringify(payload),
        dataType: 'json',
        contentType: 'application/json',
    });
}
