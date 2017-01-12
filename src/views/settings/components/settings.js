import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';
import {ActionBar} from '~/src/views';
import {Modal, Button, FormControl, Collapse, Well} from 'react-bootstrap/lib/';
import {CirclePicker} from 'react-color';
import './settings.scss';

export default class Settings extends Component {

    Password() {
        return (
            <div>
                <h2>Password</h2>
                <PasswordDialog/>
            </div>
        )
    }

    Background() {
        return (
            <div>
                <h2>Background</h2>
                <p>Change your background color</p>
                <ColorPickerDialog/>
            </div>
        );
    }

    Statistic() {
        return (
            <div>
                <h2>Statistic</h2>
                <p>Storage Used:</p>
                <p>Files Uploaded:</p>
            </div>
        );
    }

    APIToken() {
        return (
            <div>
                <h2>API Token</h2>
                <FormControl componentClass="textarea" placeholder="ALSDKJFH34873081JD" readonly/>
                <Button bsStyle="info">Refresh</Button>
            </div>
        );
    }

    ItemTypes() {
        return (
            <div>
                <h2>Item Types</h2>
                <p>Click to edit auto generated metadata fields </p>
                <Button bsStyle="info">Edit</Button>
            </div>
        );
    }

    render() {
        return (
            <div>
                <ActionBar
                    backVisible={true}
                    uploadVisible={false}
                    searchVisible={false}
                    settingsVisible={false}
                />

                <p className="settings">SETTINGS</p>

                <div className="aside">
                    <img src="http://www.clipartbest.com/cliparts/MTL/xLa/MTLxLaArc.gif" alt="logo" width='304' height="228"/>
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
        return {showModal: false};
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
                        <form>
                            <h4>Old Password</h4>
                            <input type="password"/>

                            <h4>New Password</h4>
                            <input type="password"/>

                            <h4>Confirm Password</h4>
                            <input type="password"/>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Save</Button>
                        <Button onClick={this.close}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
});

const ColorPickerDialog = React.createClass({
    getInitialState() {
        return {showModal: false};
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
                        <Button onClick={this.close}>Save</Button>
                        <Button onClick={this.close}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
});