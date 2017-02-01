/**
 * Created by Dung Mai on 1/31/2017.
 */
import React, {PropTypes, Component} from 'react';
import {
    Modal, Button, FormControl, Collapse, Well, Jumbotron, Panel, FormGroup, Col, Form, ControlLabel, MenuItem, Row
} from 'react-bootstrap/lib/';

export default class Password extends Component {

    static propTypes = {
        showModal: PropTypes.boolean,
        newPassword: PropTypes.string,
        confirmPassword: PropTypes.string,

        newPasswordChange: PropTypes.func.isRequired,
        confirmPasswordChange: PropTypes.func.isRequired,
    };


    handleNewPasswordChange = (e) => {
        const {newPasswordChange} = this.props;
        newPasswordChange(e.target.value);
    }

    handleConfirmPassChange = (e) => {
        const {confirmPasswordChange} = this.props;
        confirmPasswordChange(e.target.value);
    }

    getValidationState() {
        let newLength = this.state.newPassword.length;
        let confirmLength = this.state.confirmPassword.length;
        let newPass = this.state.newPassword;
        let confirmPass = this.state.confirmPassword;
        if (newLength > 1 && confirmLength > 1 && newPass != confirmPass)
            return 'error';
        else if (newLength > 1 && confirmLength > 1 && newPass == confirmPass)
            return 'success';
    }

    close() {
        const {showModal} = this.props;
        this.setState({showModal: false});
    }

    open() {
        const {showModal} = this.props;
        this.setState({showModal: true});
    }

    render() {

        const {showModal, newPassword, confirmPassword} = this.props;
        return (
            <div>
                <p>Change your account password</p>
                <Button
                    bsStyle="info"
                    onClick={this.open}>
                    Change Password
                </Button>
                <Modal show={showModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Change Your Password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal>
                            <FormGroup controlId="formBasicText">
                                <Col componentClass={ControlLabel} sm={3}>
                                    Old Password
                                </Col>
                                <Col sm={7}>
                                    <FormControl type="password"/>
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalPassword" validationState={this.getValidationState()}>
                                <Col componentClass={ControlLabel} sm={3}>
                                    New Password
                                </Col>
                                <Col sm={7}>
                                    <FormControl type="password" value={newPassword}
                                                 onChange={this.handleNewPasswordChange}/>
                                    <FormControl.Feedback />
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalPassword" validationState={this.getValidationState()}>
                                <Col componentClass={ControlLabel} sm={3}>
                                    Retype Password
                                </Col>
                                <Col sm={7}>
                                    <FormControl type="password" value={confirmPassword}
                                                 onChange={this.handleConfirmPassChange}/>
                                    <FormControl.Feedback />
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

}