import React, { PropTypes, Component } from 'react';
import './action-bar.scss';

export default class ActionBar extends Component {

    static propTypes = {
        backVisible: PropTypes.bool,
    };

    render() {
        const { backVisible } = this.props;
        return (
            <div className='action-bar'>
                { !backVisible ? <button className='action-bar-back-button'>Back</button> : <div /> }
                <div className='action-bar-search'>
                    <input className='action-bar-search-input' />
                    <button className='action-bar-search-button'>Search</button>
                    <a href='#advanced'>Advanced</a>
                </div>
                <div className='action-bar-right-buttons'>
                    <button className='action-bar-upload'>Upload</button>
                    <button className='action-bar-settings'>Settings</button>
                    <button className='action-bar-logout'>Log Out</button>
                </div>
            </div>
        );
    }
}
