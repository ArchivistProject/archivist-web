import React, { PropTypes, Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { getFormattedPathname } from '~/src/utils/utils';
import { SIDEBAR_TABS } from '~/src/state/sidebar/sidebar-constants';
import './action-bar.scss';

export default class ActionBar extends Component {

    static propTypes = {
        loggedIn: PropTypes.bool.isRequired,
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
        submitSearch: PropTypes.func.isRequired,
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
        const { loggedIn, backVisible, uploadVisible, searchVisible, settingsVisible, logoutVisible, submitSearch } = this.props;
        const inlineStyle = { display: 'inline' };
        const width = { width: '1%' };
        const table = { display: 'table' };
        return loggedIn ? (
            <div className='action-bar-wrapper navbar navbar-static-top'>
                <div className='action-bar'>
                    <div className='navbar-header'>
                        <button
                            type='button' className='navbar-toggle' data-toggle='collapse'
                            data-target='.navbar-collapse'
                        />
                        <a className='navbar-brand brand-name' href='/'>Archivist</a>
                        {backVisible ?
                            <a className='navbar-brand back-btn' onClick={browserHistory.goBack}>
                                <span className='glyphicon glyphicon-arrow-left' title='Go back' />
                            </a> : null }
                    </div>

                    <div className='navbar-collapse collapse' id='searchbar'>
                        <ul className='nav navbar-nav navbar-right'>
                            {searchVisible ?
                                <li><a onClick={this.handleAdvancedSearchClicked}>Advanced Search</a></li> : null }

                            {uploadVisible ?
                                <li><a href='/upload'>
                                    <span className='glyphicon glyphicon-upload' title='Upload a file' />
                                </a></li> : null }

                            {settingsVisible ?
                                <li><a href='/settings'>
                                    <span className='glyphicon glyphicon-cog' title='Settings' />
                                </a></li> : null }

                            {logoutVisible ?
                                <li><a onClick={this.handleLogout}>
                                    <span className='glyphicon glyphicon-log-out' title='Logout' />
                                </a></li> : null }
                        </ul>
                        { searchVisible ?
                            <form className='navbar-form'>
                                <div className='form-group' style={inlineStyle}>
                                    <div className='input-group' style={table}>
                                        <input
                                            className='form-control' name='search' placeholder='Search Here'
                                            autoComplete='off' autoFocus='autofocus'
                                        />
                                        <span className='input-group-addon' style={width}><span
                                            className='glyphicon glyphicon-search'
                                        /></span>
                                    </div>
                                </div>
                            </form>
                            : null }
                    </div>
                </div>
            </div>
        ) : null;
    }
}
