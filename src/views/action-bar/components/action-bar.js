import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import './action-bar.scss';

export default class ActionBar extends Component {

    static propTypes = {
        loggedIn: PropTypes.bool,
        backVisible: PropTypes.bool,
        uploadVisible: PropTypes.bool,
        searchVisible: PropTypes.bool,
    };

    render() {
        const { loggedIn, backVisible, uploadVisible = true, searchVisible } = this.props;
        return (
            <div className='action-bar-wrapper'>
                { !loggedIn ?
                    <div className='action-bar'>
                        { backVisible ? <Link to='/'><button className='action-bar-back-button'>Back</button></Link> : <div /> }
                        { searchVisible ? 
                            (
                                <div className='action-bar-search'>
                                    <input type='search' className='action-bar-search-input' />
                                    <button className='action-bar-search-button'>Search</button>
                                    <a href='#advanced'>Advanced</a>
                                </div>
                            ) : <div />
                        }
                        <div className='action-bar-right-buttons'>
                            {uploadVisible ? <Link to='/upload'><button className='action-bar-upload'>Upload</button></Link> : null }
                            <button className='action-bar-settings'>Settings</button>
                            <button className='action-bar-logout'>Log Out</button>
                        </div>
                    </div>
                : null}
            </div>
        );
    }
}
