import React, { PropTypes, Component } from 'react';
import {
    Modal, Button, FormControl, FormGroup, Col, Form, ControlLabel } from 'react-bootstrap/lib/';

export default class Password extends Component {

    static propTypes = {
        showModal: PropTypes.bool,
        newPassword: PropTypes.string,
        confirmPassword: PropTypes.string,
        newPasswordChange: PropTypes.func.isRequired,
        confirmPasswordChange: PropTypes.func.isRequired,
        openDialog: PropTypes.func.isRequired,
        closeDialog: PropTypes.func.isRequired,
    };


    handleNewPasswordChange = (e) => {
        const { newPasswordChange } = this.props;
        newPasswordChange(e.target.value);
    };

    handleConfirmPassChange = (e) => {
        const { confirmPasswordChange } = this.props;
        confirmPasswordChange(e.target.value);
    };


    /**
    getValidationState = () => {
        const {newPassword, confirmPassword} = this.props;
        let newLength = newPassword.length;
        let confirmLength = confirmPassword.length;
        console.log("Confirm length: " + confirmLength);
        console.log("New length: " + newLength);
        if (newLength > 1 && confirmLength > 1 && newPassword != confirmPassword)
            return 'error';
        else if (newLength > 1 && confirmLength > 1 && newPassword == confirmPassword)
            return 'success';
    }
**/

    close = () => {
        const { closeDialog } = this.props;
        closeDialog(false);
    };

    open = () => {
        const { openDialog } = this.props;
        openDialog(true);
    };

    render() {
        const { showModal, newPassword, confirmPassword } = this.props;
        return (
            <div>
                <p>Change your account password</p>
                <Button
                    bsStyle='info'
                    onClick={this.open}
                >
                    Change Password
                </Button>
                <Modal show={showModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Change Your Password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal>
                            <FormGroup controlId='formBasicText'>
                                <Col componentClass={ControlLabel} sm={3}>
                                    Old Password
                                </Col>
                                <Col sm={7}>
                                    <FormControl type='password' />
                                </Col>
                            </FormGroup>

                            <FormGroup controlId='formHorizontalPassword'>
                                <Col componentClass={ControlLabel} sm={3}>
                                    New Password
                                </Col>
                                <Col sm={7}>
                                    <FormControl
                                        type='password' value={newPassword}
                                        onChange={this.handleNewPasswordChange}
                                    />
                                    <FormControl.Feedback />
                                </Col>
                            </FormGroup>

                            <FormGroup controlId='formHorizontalPassword'>
                                <Col componentClass={ControlLabel} sm={3}>
                                    Retype Password
                                </Col>
                                <Col sm={7}>
                                    <FormControl
                                        type='password' value={confirmPassword}
                                        onChange={this.handleConfirmPassChange}
                                    />
                                    <FormControl.Feedback />
                                </Col>
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle='success' onClick={this.close}>Save</Button>
                        <Button bsStyle='warning' onClick={this.close}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }

}
