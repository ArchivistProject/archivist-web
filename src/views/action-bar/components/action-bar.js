import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { getFormattedPathname } from '~/src/utils/utils';
import { SIDEBAR_TABS } from '~/src/state/sidebar/sidebar-constants';
import './action-bar.scss';

export default class ActionBar extends Component {

    static propTypes = {
        loggedIn: PropTypes.bool,
        logout: PropTypes.func.isRequired,
        backVisible: PropTypes.bool.isRequired,
        uploadVisible: PropTypes.bool.isRequired,
        searchVisible: PropTypes.bool.isRequired,
        settingsVisible: PropTypes.bool.isRequired,
        logoutVisible: PropTypes.bool.isRequired,
        updateVisibilities: PropTypes.func.isRequired,
        pathname: PropTypes.string.isRequired,
        updateVisibility: PropTypes.func.isRequired,
        updateTabVisibility: PropTypes.func.isRequired,
    };

    componentDidMount() {
        const { updateVisibilities, pathname } = this.props;
        updateVisibilities(getFormattedPathname(pathname));
    }

    componentWillReceiveProps(nextProps) {
        const { updateVisibilities, pathname } = this.props;
        const { pathname: newPathname } = nextProps;
        if (pathname !== newPathname) {
            updateVisibilities(getFormattedPathname(newPathname));
        }
    }

    handleLogout = () => {
        const { logout } = this.props;
        logout();
    }

    handleAdvancedSearchClicked = () => {
        const { updateVisibility, updateTabVisibility } = this.props;
        updateVisibility(true);
        updateTabVisibility(SIDEBAR_TABS.SEARCH);
    }

    render() {
        const { loggedIn, backVisible, uploadVisible, searchVisible, settingsVisible, logoutVisible } = this.props;

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
                                        <a onClick={this.handleAdvancedSearchClicked}>Advanced</a>
                                    </div>
                                ) : null
                            }
                        </div>
                        <div className='action-bar-right-buttons'>
                            {uploadVisible ? <Link to='/upload'><button className='action-bar-upload'>Upload</button></Link> : null }
                            {settingsVisible ? <Link to='/settings'> <button className='action-bar-settings'>Settings</button></Link> : null }
                            {logoutVisible ? <button className='action-bar-logout' onClick={this.handleLogout}>Log Out</button> : null }
                        </div>
                    </div>
                : null}
            </div>
        );
    }
}
