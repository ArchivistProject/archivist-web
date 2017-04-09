import React, { PropTypes, Component } from 'react';
import Logo from '~/src/assets/images/logo.png';
import './login.scss';

export default class Login extends Component {

    static propTypes = {
        usernameChanged: PropTypes.func.isRequired,
        passwordChanged: PropTypes.func.isRequired,
        login: PropTypes.func.isRequired,

        usernameField: PropTypes.string.isRequired,
        passwordField: PropTypes.string.isRequired,
    };

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
    }

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

    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.handleLoginClicked();
        }
    }

    render() {
        const { usernameField, passwordField } = this.props;
        return (
            <div className='login'>
                <div className='left-half'>
                    <label>Username</label>
                    <input className='login-username' value={usernameField} onChange={this.handleUsernameChanged} />
                    <label>Password</label>
                    <input type='password' className='login-password' value={passwordField} onChange={this.handlePasswordChanged} />
                    <button className='login-submit' onClick={this.handleLoginClicked}>LOGIN</button>
                </div>
                <div className='right-half'>
                    <img className='logo' src={Logo} alt='logo' width='200' height='164' align='center' />
                </div>
                <div className='footer' />
            </div>
        );
    }
}
