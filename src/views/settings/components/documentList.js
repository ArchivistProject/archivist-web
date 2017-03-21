import React, { PropTypes, Component } from 'react';
import { Button, FormControl, ControlLabel, Col,
} from 'react-bootstrap/lib/';

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
                <Col componentClass={ControlLabel} md={3}>
                  Documents Per Page:
                </Col>

                <Col className='mb-1' md={4}>
                    <FormControl
                        type='number'
                        value={documentsPerPage || 10}
                        onChange={this.handleDocsPerPageInputChange}
                    />
                </Col>
                <Col md={12}>
                    <Button bsStyle='info' onClick={this.saveSettings}>Save</Button>
                </Col>
            </div>
        );
    }

}
