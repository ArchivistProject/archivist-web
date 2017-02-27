import { ajax } from '~/src/utils/utils';

export function uploadFile(file, tagArray, metaData) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
        const base64File = e.target.result;

        const document = {
            document: {
                file: base64File,
                tags: tagArray,
                metadata_fields: metaData,
            },
        };

        $.ajax({
            url: `${config.backend}/public/documents`,
            type: 'POST',
            data: JSON.stringify(document),
            success(response) {
                alert('Successfully uploaded');
            },
            error() {
                alert('Failed to upload, try again later');
            },
            contentType: 'application/json',
            dataType: 'json',
        });
    };
}

export function fetchItemTypes() {
    return ajax('GET', 'system/groups')
        .then(response => response.json())
        .catch(response => console.log('error', response));
}
