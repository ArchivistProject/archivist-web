import React, { PropTypes, Component } from 'react';
import { formatDate } from '~/src/utils/utils';
import { SIDEBAR_TABS } from '~/src/state/sidebar/sidebar-constants';
import SummaryTab from './tabs/summary-tab';
import './sidebar.scss';

export default class Sidebar extends Component {

    static propTypes = {
        activeItem: PropTypes.object,
        visible: PropTypes.bool.isRequired,
        visibleTab: PropTypes.string,
        updateVisibility: PropTypes.func.isRequired,
        updateTabVisibility: PropTypes.func.isRequired,
    };

    handleTabClicked = (tabName) => {
        const { updateTabVisibility, visibleTab } = this.props;
        if (visibleTab !== tabName) {
            updateTabVisibility(tabName);
        }
    }

    handleSidebarClosed = () => {
        const { updateVisibility } = this.props;
        updateVisibility(false);
    }

    renderSearch() {
        const { visibleTab } = this.props;

        return visibleTab === SIDEBAR_TABS.SEARCH ?
            <div className='sidebar-tab sidebar-search'>This is the search tab</div> : null;
    }

    renderTabs() {
        const { visibleTab } = this.props;
        return (
            <div className='sidebar-tabs'>
                { Object.keys(SIDEBAR_TABS).map((tab, key) =>
                    (
                        <button
                            key={key}
                            onClick={() => this.handleTabClicked(SIDEBAR_TABS[tab])}
                            disabled={visibleTab === SIDEBAR_TABS[tab]}
                            className='sidebar-tabs-item'
                        >
                            {SIDEBAR_TABS[tab].toUpperCase()}
                        </button>
                    )
                )}
                <button className='sidebar-close' onClick={this.handleSidebarClosed}><i className='icon-cross' /></button>
            </div>
        );
    }

    render() {
        const { activeItem, visible, visibleTab } = this.props;
        return visible ? (
            <div className='sidebar'>
                {this.renderTabs()}

                <SummaryTab
                    activeItem={activeItem}
                    visibleTab={visibleTab}
                />
                {this.renderSearch()}
            </div>
        ) : null;
    }
}
