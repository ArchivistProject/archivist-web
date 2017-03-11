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
            <div className='main'>
                <div className='col-lg-12'>
                    <div className='container'>
                        <div className='col-lg-4' />
                        <div className='col-lg-4'>
                            <div className='row grids text-center'>
                                <div className='view view-tenth'>
                                    <div className='inner_content clearfix'>
                                        <div className='product_image'>
                                            <img
                                                src={Logo}
                                                className='img-responsive' alt='archivist logo'
                                            />
                                        </div>
                                        <div className='label-product'>
                                            <span className='new'>LOGIN</span>
                                        </div>
                                        <div className='mask'>
                                            <h2>Welcome To Archivist</h2>
                                            <div className='main'>
                                                <form>
                                                    <input
                                                        type='text' className='text' value={usernameField}
                                                        onChange={this.handleUsernameChanged}
                                                        placeholder='username'
                                                    />
                                                    <input
                                                        type='password' placeholder='Password'
                                                        value={passwordField}
                                                        onChange={this.handlePasswordChanged}
                                                    />
                                                    <div className='submit'><input
                                                        type='submit' value='Login'
                                                        onClick={this.handleLoginClicked}
                                                    />
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
