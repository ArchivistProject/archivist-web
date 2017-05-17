import { ajax } from '~/src/utils/utils';

export function uploadFile(file, tagArray, metaData, desc) {
    const doc = {
        document: {
            file,
            description: desc,
            tags: tagArray,
            metadata_fields: metaData,
        },
    };

    return ajax('POST', 'documents', doc);
}

export function fetchItemTypes() {
    return ajax('GET', 'system/groups');
}
