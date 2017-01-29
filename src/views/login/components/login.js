import React, { PropTypes, Component } from 'react';
import './login.scss';

export default class Login extends Component {

    static propTypes = {
        usernameChanged: PropTypes.func.isRequired,
        passwordChanged: PropTypes.func.isRequired,
        login: PropTypes.func.isRequired,

        usernameField: PropTypes.string.isRequired,
        passwordField: PropTypes.string.isRequired,
    };

    handleUsernameChanged = (e) => {
        const { usernameChanged } = this.props;
        usernameChanged(e.target.value);
    }

    handlePasswordChanged = (e) => {
        const { passwordChanged } = this.props;
        passwordChanged(e.target.value);
    }

    handleLoginClicked = () => {
        const { login, usernameField, passwordField } = this.props;
        login(usernameField, passwordField);
    }


    render() {
        const { usernameField, passwordField } = this.props;
        return (
            <div className='login'>
                <input className='login-username' value={usernameField} onChange={this.handleUsernameChanged} />
                <input type='password' className='login-password' value={passwordField} onChange={this.handlePasswordChanged} />
                <button className='login-submit' onClick={this.handleLoginClicked}>Log In</button>
            </div>
        );
    }
}
