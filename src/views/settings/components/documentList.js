import React, { PropTypes, Component } from 'react';
import { Button } from 'react-bootstrap/lib/';

export default class DocumentList extends Component {

    static propTypes = {
        documentsPerPage: PropTypes.number,
        documentListSettingID: PropTypes.string,
        saveDocumentListSettings: PropTypes.func.isRequired,
        fetchDocumentListSettings: PropTypes.func.isRequired,
        handleDocsPerPageChange: PropTypes.func.isRequired,
    };

    componentDidMount() {
        const { fetchDocumentListSettings } = this.props;
        fetchDocumentListSettings();
    }

    handleDocsPerPageInputChange = (e) => {
        const { handleDocsPerPageChange } = this.props;
        const documentsPerPage = e.target.value;
        handleDocsPerPageChange(documentsPerPage);
    };

    saveSettings = () => {
        const { saveDocumentListSettings, documentListSettingID, documentsPerPage } = this.props;
        saveDocumentListSettings(documentListSettingID, documentsPerPage);
    };

    render() {
        const { documentsPerPage } = this.props;
        return (
            <div>
                <p className='settings-label'>File List:</p>
                <p>Number of files to display:</p>
                <input
                    type='number'
                    value={documentsPerPage || 10}
                    onChange={this.handleDocsPerPageInputChange}
                />
                <div className='settings-margin-bottom'>
                    <Button onClick={this.saveSettings}>Save</Button>
                </div>
            </div>
        );
    }

}
