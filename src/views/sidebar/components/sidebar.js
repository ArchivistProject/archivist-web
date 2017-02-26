import React, { PropTypes, Component } from 'react';
import { formatDate } from '~/src/utils/utils';
import { SIDEBAR_TABS } from '~/src/state/sidebar/sidebar-constants';
import SummaryTab from './tabs/summary-tab';
import MainSearchTab from './tabs/main-search-tab';
import './sidebar.scss';

export default class Sidebar extends Component {

    static propTypes = {
        activeItem: PropTypes.object,
        activeItemEditing: PropTypes.object,
        visible: PropTypes.bool.isRequired,
        visibleTab: PropTypes.string,
        updateVisibility: PropTypes.func.isRequired,
        updateTabVisibility: PropTypes.func.isRequired,
        toggleMetadataEditMode: PropTypes.func.isRequired,
        toggleDescriptionEditMode: PropTypes.func.isRequired,
        updateMetadata: PropTypes.func.isRequired,
        saveMetadata: PropTypes.func.isRequired,
        saveTags: PropTypes.func.isRequired,
        updateDescription: PropTypes.func.isRequired,
        saveDescription: PropTypes.func.isRequired,
        metadataEditMode: PropTypes.bool.isRequired,
        descriptionEditMode: PropTypes.bool.isRequired,
        tempDescription: PropTypes.string,
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

    renderPanel() {
        const { visibleTab, activeItem, activeItemEditing, toggleMetadataEditMode, toggleDescriptionEditMode, updateMetadata, saveMetadata, saveTags,
            updateDescription, saveDescription, metadataEditMode, descriptionEditMode, tempDescription } = this.props;
        const summaryTabProps = {
            activeItem,
            activeItemEditing,
            toggleMetadataEditMode,
            toggleDescriptionEditMode,
            updateMetadata,
            saveMetadata,
            saveTags,
            updateDescription,
            saveDescription,
            metadataEditMode,
            descriptionEditMode,
            tempDescription };
        switch (visibleTab) {
            case SIDEBAR_TABS.SUMMARY:
                return (<SummaryTab {...summaryTabProps} />);
            case SIDEBAR_TABS.SEARCH:
                return (<MainSearchTab />);
            default:
                return null;
        }
    }

    render() {
        const { visible } = this.props;
        return visible ? (
            <div className='sidebar'>
                {this.renderTabs()}
                {this.renderPanel()}
            </div>
        ) : null;
    }
}
