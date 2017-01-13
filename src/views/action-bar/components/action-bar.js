import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import './action-bar.scss';

export default class ActionBar extends Component {

    static propTypes = {
        loggedIn: PropTypes.bool,
        backVisible: PropTypes.bool.isRequired,
        uploadVisible: PropTypes.bool.isRequired,
        searchVisible: PropTypes.bool.isRequired,
        pathname: PropTypes.string.isRequired,
    };

    componentWillReceiveProps(nextProps) {
        const { pathname } = this.props;
        const { pathname: newPathname } = nextProps;
        if (pathname !== newPathname) {
            
        }
    }

    render() {
        const { loggedIn, backVisible, uploadVisible, searchVisible } = this.props;
        return (
            <div className='action-bar-wrapper'>
                { !loggedIn ?
                    <div className='action-bar'>
                        <div className='action-bar-back'>
                            { backVisible ? <Link to='/'><button className='action-bar-back-button'>Back</button></Link> : null }
                        </div>
                        <div className='action-bar-search'>
                            { searchVisible ?
                                (
                                    <div>
                                        <input type='search' className='action-bar-search-input' />
                                        <button className='action-bar-search-button'>Search</button>
                                        <a href='#advanced'>Advanced</a>
                                    </div>
                                ) : null
                            }
                        </div>
                        <div className='action-bar-right-buttons'>
                            {uploadVisible ? <Link to='/upload' className='action-bar-upload'>Upload</Link> : null }
                            <a className='action-bar-settings'>Settings</a>
                            <a className='action-bar-logout'>Log Out</a>
                        </div>
                    </div>
                : null}
            </div>
        );
    }
}
