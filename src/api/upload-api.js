import config from '~/config';
import $ from 'jquery';

export function uploadFile(file, tagArray, metaData, desc) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
        const base64File = e.target.result;
        const document = {
            document: {
                file: base64File,
                description: desc,
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
    return fetch(`${config.backend}/system/groups`)
        .then(response => response.json())
        .catch(response => console.log('error', response));
}
