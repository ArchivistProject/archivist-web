import { ajax } from '~/src/utils/utils';

export function uploadFile(file, tagArray, metaData) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
        const base64File = e.target.result;

        const doc = {
            document: {
                file: base64File,
                tags: tagArray,
                metadata_fields: metaData,
            },
        };

        ajax('POST', 'documents', doc)
            .then(response => alert('Successfully uploaded'))
            .catch(error => alert('Failed to upload, try again later'));
    };
}

export function fetchItemTypes() {
    return ajax('GET', 'system/groups');
}
