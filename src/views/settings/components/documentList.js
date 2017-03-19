import React, { PropTypes, Component } from 'react';
import { Button, FormControl, ControlLabel, Col
} from 'react-bootstrap/lib/';

export default class DocumentList extends Component {

  static propTypes = {
    documentListSettingID: PropTypes.string,
    documentsPerPage: PropTypes.number,
    saveDocumentListSettings: PropTypes.func.isRequired,
    fetchDocumentListSettings: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { fetchDocumentListSettings } = this.props;
    fetchDocumentListSettings();
  };

  handleDocsPerPageChange = (e) => {
    const { handleDocsPerPageChange } = this.props;
    const docsPerPage = e.target.value;
    handleDocsPerPageChange(docsPerPage);
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
            type='text'
            value={documentsPerPage}
            onChange={this.handleDocsPerPageChange}
          >

          </FormControl>
        </Col>
        <Col md={12}>
          <Button bsStyle='info' onClick={this.saveSettings}>Save</Button>
        </Col>
      </div>
    );
  }

}
