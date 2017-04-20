import React, { PropTypes, Component } from 'react';

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
                <p>
                  Documents Per Page:
                </p>

                <p className='mb-1'>
                    <input
                        type='number'
                        value={documentsPerPage || 10}
                        onChange={this.handleDocsPerPageInputChange}
                    />
                </p>
                <button onClick={this.saveSettings}>Save</button>
            </div>
        );
    }

}
