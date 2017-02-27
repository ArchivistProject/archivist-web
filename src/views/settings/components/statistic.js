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


    render() {
        const { storage, fileCount } = this.props;
        return (

            <div>

                <Col sm={3} componentClass={ControlLabel}>Total Files Uploaded: </Col>
                <Col sm={8}>
                    <p>{fileCount}</p>
                </Col>

                <Col sm={3} componentClass={ControlLabel}>Storage Size: </Col>
                <Col sm={8}>
                    <p>{storage}</p>
                </Col>
            </div>

        );
    }
}
