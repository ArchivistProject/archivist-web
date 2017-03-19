import React, { PropTypes, Component } from 'react';
import { Button, FormControl, ControlLabel, Col
} from 'react-bootstrap/lib/';

export default class DocumentList extends Component {

  static propTypes = {
    documentsPerPage: PropTypes.string,
    saveDocumentListSettings: PropTypes.func.isRequired,
  };

  saveSettings = () => {
    const { documentsPerPage } = this.props;
    documentsPerPage();
  };

  render() {
    const { documentsPerPage } = this.props;
    return (
      <div>

        <Col componentClass={ControlLabel} md={3}>
          Documents Per Page:
        </Col>

        <Col class='mb-1' md={4}>
          <FormControl
            type='text'
            placeholder='10'
          >
            {documentsPerPage}
          </FormControl>
        </Col>
        <Col md={12}>
          <Button bsStyle='info' onClick={this.saveSettings}>Save</Button>
        </Col>
      </div>
    );
  }

}
