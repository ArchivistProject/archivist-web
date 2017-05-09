import React, { PropTypes, Component } from 'react';
import { browserHistory } from 'react-router';
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
        simpleSearchQuery: PropTypes.string.isRequired,
        updateVisibilities: PropTypes.func.isRequired,
        pathname: PropTypes.string.isRequired,
        updateVisibility: PropTypes.func.isRequired,
        updateTabVisibility: PropTypes.func.isRequired,
        setupSimpleSearch: PropTypes.func.isRequired,
        submitSearch: PropTypes.func.isRequired,
        fetchItemTypes: PropTypes.func.isRequired,
        updateSimpleSearchQuery: PropTypes.func.isRequired,
    };

    componentDidMount() {
        const { updateVisibilities, pathname } = this.props;
        updateVisibilities(getFormattedPathname(pathname));
    }

    componentWillReceiveProps(nextProps) {
        const { updateVisibilities, pathname, searchVisible, fetchItemTypes } = this.props;
        const { pathname: newPathname } = nextProps;
        const { searchVisible: newSearchVisible } = nextProps;
        if (pathname !== newPathname) {
            updateVisibilities(getFormattedPathname(newPathname));
        }
        if (newSearchVisible && !searchVisible) {
            fetchItemTypes();
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

    handleSearchClicked = (event) => {
        const { simpleSearchQuery, setupSimpleSearch, submitSearch } = this.props;
        if (event.type === 'click' || event.key === 'Enter') {
            setupSimpleSearch(simpleSearchQuery);
            submitSearch();
        }
    }

    render() {
        const { loggedIn, backVisible, uploadVisible, searchVisible, settingsVisible, logoutVisible, submitSearch, updateSimpleSearchQuery } = this.props;
        return loggedIn ? (
            <div className='action-bar'>
                <div className='action-bar-left'>
                    <a className='home-btn' href='/'>Archivist</a>
                    {backVisible ?
                        <a className='back-btn' onClick={browserHistory.goBack}>
                            <span className='glyphicon glyphicon-arrow-left' title='Go back' />
                        </a> : null }
                </div>

                { searchVisible ?
                    <div className='action-bar-search'>
                        <input className='action-bar-search-input' onChange={e => updateSimpleSearchQuery(e.target.value)} onKeyPress={this.handleSearchClicked} />
                        <button className='glyphicon glyphicon-search' onClick={this.handleSearchClicked} />
                        <a onClick={this.handleAdvancedSearchClicked}>Advanced Search</a>
                    </div>
                    : null }
                <div className='action-bar-right'>
                    {uploadVisible ?
                        <div><a href='/upload'>
                            <span className='glyphicon glyphicon-upload' title='Upload a file' />
                        </a></div> : null }

                    {settingsVisible ?
                        <div><a href='/settings'>
                            <span className='glyphicon glyphicon-cog' title='Settings' />
                        </a></div> : null }

                    {logoutVisible ?
                        <div><a onClick={this.handleLogout}>
                            <span className='glyphicon glyphicon-log-out' title='Logout' />
                        </a></div> : null }
                </div>
            </div>
        ) : null;
    }
}
