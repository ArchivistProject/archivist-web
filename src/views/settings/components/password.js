import React, { PropTypes, Component } from 'react';
import { Button } from 'react-bootstrap/lib/';

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
                <hr />
                <p className='settings-label'>Password</p>
                <p>Change your account password</p>
                {!showModal ? <Button onClick={this.open}>Change Password</Button> : null }
                {showModal ?
                    <div>
                        <input className='text-input-password' placeholder='Enter old password' type='password' />
                        <input
                            className='text-input-password'
                            placeholder='Enter new password'
                            type='password' value={newPassword}
                            onChange={this.handleNewPasswordChange}
                        />
                        <input
                            className='text-input-password'
                            placeholder='Retype new password'
                            type='password' value={confirmPassword}
                            onChange={this.handleConfirmPassChange}
                        />
                        <div className='settings-left-margin'>
                            <Button onClick={this.close}>Save</Button>
                            <Button onClick={this.close}>Cancel</Button>
                        </div>
                    </div>
                : null}
            </div>
        );
    }

}
