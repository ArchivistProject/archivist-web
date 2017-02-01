/**
 * Created by Dung Mai on 2/1/2017.
 */
import React, {PropTypes, Component} from 'react';
import {
    Modal, Button, FormControl, Collapse, Well, Jumbotron, Panel, FormGroup, Col, Form, ControlLabel, MenuItem, Row
} from 'react-bootstrap/lib/';

export default class Statistic extends Component {

    static propTypes = {
        storage: PropTypes.number,
        fileCount: PropTypes.number,
        newPasswordChange: PropTypes.func.isRequired,
        confirmPasswordChange: PropTypes.func.isRequired,
    };

     componentWillMount() {
        const { fetchItemType, groups } = this.props;
        fetchItemType();
    }


    render(){
        return (
            <div>
                    <p>Storage Used:</p>
                    <p>Files Uploaded:</p>
            </div>
        )
    }
}