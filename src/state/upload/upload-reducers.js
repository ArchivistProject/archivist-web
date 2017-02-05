import uploadActionTypes from './upload-action-types';

const initialState = {
    file: null,
    data: {
        "groups": [
            {
                "id": "1234s",
                "name": "Journal",
                "fields": [
                    {
                        "id": "3435d",
                        "name": "name 1",
                        "type": "string"
                    },
                    {
                        "id": "58964",
                        "name": "name 2",
                        "type": "string"
                    }
                ]
            },
            {
                "id": "58964",
                "name": "URL",
                "fields": []
            }
        ]}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case uploadActionTypes.UPLOAD_FILE_UPDATED: {
            const { file } = action.data;
            return {
                ...state,
                file,
            };
        }
        case uploadActionTypes.FILE_UPLOAD_SUCCEEDED: {
            return {
                ...state,
            };
        }
        case uploadActionTypes.FILE_UPLOAD_FAILED: {
            return {
                ...state,
            };
        }
    }
    return state;
}
