import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';
import {ActionBar} from '~/src/views';
import {
    Modal,
    Button,
    FormControl,
    Collapse,
    Well,
    Jumbotron,
    Panel,
    FormGroup,
    Col,
    Form,
    ControlLabel,
    MenuItem,
    Row
} from 'react-bootstrap/lib/';
import {CirclePicker} from 'react-color';
import './settings.scss';

export default class Settings extends Component {

    Password() {
        return (
            <div>
                <Panel header="Password" bsStyle="info">
                    <PasswordDialog/>
                </Panel>
            </div>
        )
    }

    Background() {
        return (
            <div>
                <Panel header="Background" bsStyle="info">
                    <p>Change your background color</p>
                    <ColorPickerDialog/>
                </Panel>
            </div>
        );
    }

    Statistic() {
        return (
            <div>
                <Panel header="Statistic" bsStyle="info">
                    <p>Storage Used:</p>
                    <p>Files Uploaded:</p>
                </Panel>
            </div>
        );
    }

    APIToken() {
        return (
            <div>
                <Panel header="API Token" bsStyle="info">
                    <FormControl componentClass="textarea" placeholder="ALSDKJFH34873081JD" readonly/>
                    <br/>
                    <Button bsStyle="info">Refresh</Button>
                </Panel>
            </div>
        );
    }

    ItemTypes() {
        return (
            <div>
                <Panel header="Item Types" bsStyle="info">
                    <p>Click to edit auto generated metadata fields </p>
                    <ItemTypesDialog/>
                </Panel>
            </div>
        );
    }

    render() {
        return (
            <div>
                <h1 className="Settings">SETTINGS</h1>

                <div className="aside">
                    <img src="http://www.logospike.com/wp-content/uploads/2015/11/A_Logo_01.gif" alt="LOGO" width='304'
                         height="228"/>
                </div>

                <div className="section">
                    {this.Password()}
                    {this.Background()}
                    {this.Statistic()}
                    {this.APIToken()}
                    {this.ItemTypes()}
                </div>
            </div>
        );
    }
}


const PasswordDialog = React.createClass({
    getInitialState() {
        return {
            showModal: false
        };
    },

    close() {
        this.setState({showModal: false});
    },

    open() {
        this.setState({showModal: true});
    },

    render() {
        return (
            <div>
                <p>Change your account password</p>
                <Button
                    bsStyle="info"
                    onClick={this.open}>
                    Change Password
                </Button>
                <Modal show={this.state.showModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Change Your Password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal>
                            <FormGroup controlId="formHorizontalEmail">
                                <Col componentClass={ControlLabel} sm={3}>
                                    Old Password
                                </Col>
                                <Col sm={7}>
                                    <FormControl type="password"/>
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalPassword">
                                <Col componentClass={ControlLabel} sm={3}>
                                    New Password
                                </Col>
                                <Col sm={7}>
                                    <FormControl type="password"/>
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalPassword">
                                <Col componentClass={ControlLabel} sm={3}>
                                    Retype Password
                                </Col>
                                <Col sm={7}>
                                    <FormControl type="password"/>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="success" onClick={this.close}>Save</Button>
                        <Button bsStyle="warning" onClick={this.close}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
});

const ColorPickerDialog = React.createClass({
    getInitialState() {
        return {
            showModal: false
        };
    },

    close() {
        this.setState({showModal: false});
    },

    open() {
        this.setState({showModal: true});
    },

    render() {
        return (
            <div>
                <Button
                    bsStyle="info"
                    onClick={this.open}>
                    Change Background
                </Button>

                <Modal show={this.state.showModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Select Your Color</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CirclePicker/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="success" onClick={this.close}>Save</Button>
                        <Button bsStyle="warning" onClick={this.close}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
});


const ItemTypesDialog = React.createClass({

    getInitialState() {
        return {inputs: []};
    },

    appendInput() {
        var newInput = this.state.inputs.length;

        this.setState({inputs: this.state.inputs.concat(newInput)}, function () {
            return;
        })
    },

    render() {
        return (
            <div>
                <Button
                    bsStyle="info"
                    onClick={this.open}>
                    Edit
                </Button>
                <Form horizontal>
                    <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} sm={3}>
                            Item Name
                        </Col>
                        <Col sm={5}>
                            <FormControl></FormControl>
                        </Col>
                        <Col sm={4}>
                            <Button onClick={ () => this.appendInput()}>Add</Button>
                        </Col>
                        <Form>
                            <div id="dynamicInput">
                                {this.state.inputs.map(function (item) {
                                    return (
                                        <Row>
                                            <div key={item} id={item}>
                                                <Col sm={2}>
                                                    <Button bsStyle="danger">X</Button>
                                                </Col>
                                                <Col sm={3}>
                                                    <FormGroup controlId="formControlsSelect">
                                                        <FormControl componentClass="select"
                                                                     placeholder="select field type">
                                                            <option value="other">Number</option>
                                                            <option value="other">Date</option>
                                                            <option value="other">Boolean</option>
                                                            <option value="other">URL</option>
                                                        </FormControl>
                                                    </FormGroup>
                                                </Col>
                                                <Col sm={7}>
                                                    <FormControl></FormControl>
                                                </Col>
                                            </div>
                                        </Row>
                                    )
                                })}
                            </div>
                        </Form>
                    </FormGroup>
                </Form>
            </div>
        );
    }
});



