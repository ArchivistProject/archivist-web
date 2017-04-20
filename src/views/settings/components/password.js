import React, { PropTypes, Component } from 'react';

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
                <button onClick={this.open}>Change Password</button>
                <p>Change Your Password</p>
                <p>Old Password</p>
                <input type='password' />
                <p>New Password</p>
                <input
                    type='password' value={newPassword}
                    onChange={this.handleNewPasswordChange}
                />

                <p>Retype Password</p>
                <input
                    type='password' value={confirmPassword}
                    onChange={this.handleConfirmPassChange}
                />
                <button onClick={this.close}>Save</button>
                <button onClick={this.close}>Cancel</button>
            </div>
        );
    }

}
