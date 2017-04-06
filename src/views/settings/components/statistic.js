import React, { PropTypes, Component } from 'react';
import { Col, ControlLabel } from 'react-bootstrap/lib/';

export default class Statistic extends Component {

    static propTypes = {
        storage: PropTypes.number,
        fileCount: PropTypes.number,
        fetchFileStorage: PropTypes.func.isRequired,
    };

    componentDidMount() {
        const { fetchFileStorage } = this.props;
        fetchFileStorage();
    }

    getHumanReadableStorage() {
      const storageInBytes = this.props.storage;

      const storageInMB = (storageInBytes / 1000000); // 1 million bytes in a MB

      if (storageInMB > 500) { // More than 500 MB, lets show storage in GB then
        return `${storageInMB / 1000} GB`; // 1000 MB in GB
      }

      return `${storageInMB} MB`;
    }

    render() {
        let { fileCount } = this.props;

        const humanReadableStorage = this.getHumanReadableStorage();

        return (

            <div>

                <Col sm={4} componentClass={ControlLabel}>Total Files Uploaded: </Col>
                <Col sm={8}>
                    <p>{fileCount}</p>
                </Col>

                <Col sm={4} componentClass={ControlLabel}>Storage Size: </Col>
                <Col sm={8}>
                    <p>{humanReadableStorage}</p>
                </Col>
            </div>

        );
    }
}
