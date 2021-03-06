import React, { PropTypes, Component } from 'react';
import Logo from '~/src/assets/images/logo.png';
import Lightbulbs from '~/src/assets/images/lightbulbs.png';
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
                    <div className='login-inner-left'>
                        <h1 className='login-welcome'>Welcome to Archivist</h1>
                        <input type='email' value={usernameField} onChange={this.handleUsernameChanged} placeholder='Username' />
                        <input type='password' value={passwordField} onChange={this.handlePasswordChanged} placeholder='Password' />
                        <button className='login-submit' type='submit' onClick={this.handleLoginClicked}>LOGIN</button>
                    </div>
                </div>
                <div className='right-half'>
                    <img className='light-bulbs' src={Lightbulbs} alt='light bulbs' />
                    <img className='logo' src={Logo} alt='logo' width='350' height='350' />
                </div>
                <div className='footer' />
            </div>
        );
    }
}
