import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { ActionBar } from '~/src/views';
import './upload.scss';

export default class Upload extends Component {

    static propTypes = {
        updateUploadFile: PropTypes.func.isRequired,
        submitFile: PropTypes.func.isRequired,
    };

    handleFileChange = (file) => {
        const { updateUploadFile } = this.props;
        updateUploadFile(file);
    }

    handleSubmit = () => {
        const { submitFile } = this.props;
        submitFile();
    }

    renderMetadataInput(fields) {
        return fields.map((field, id) =>
            (
                <div className='upload-metadata-input' key={id}>
                    <span className='upload-label'>{field.label}</span>
                    <input type={field.type} />
                </div>
            )
        );
    }

    render() {
        return (
            <div className='upload'>
                <ActionBar
                    backVisible={true}
                    uploadVisible={false}
                    searchVisible={false}
                />
                <div className='upload-content'>
                    <div className='upload-file-upload'>
                        <span className='upload-label'>File</span>
                        <input type='file' accept='.pdf, .html' onChange={this.handleFileChange} />
                    </div>
                    {this.renderMetadataInput([
                        {
                            label: 'Title',
                            type: 'text',
                        },
                        {
                            label: 'Author',
                            type: 'text',
                        },
                        {
                            label: 'Date Published',
                            type: 'date',
                        },
                    ])}
                    <button className='upload-submit' onClick={this.handleSubmit}>Upload</button>
                </div>
            </div>
        );
    }
}
