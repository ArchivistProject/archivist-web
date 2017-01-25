import React, { PropTypes, Component } from 'react';
import './login.scss';

export default class Login extends Component {

    static propTypes = {
    };

    render() {
        return (
            <div className='login'>
                <form className='login-form'>
                    <input className='login-username' />
                    <input type='password' className='login-password' />
                    <button className='login-submit'>Log In</button>
                </form>
            </div>
        );
    }
}
