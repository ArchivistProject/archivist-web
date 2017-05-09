import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { formatDate } from '~/src/utils/utils';
import { SIDEBAR_TABS } from '~/src/state/sidebar/sidebar-constants';
import Loader from '~/src/components/loader/loader';
import * as searchActionCreators from '~/src/state/search/search-action-creators';
import SummaryTab from './summary-tab/summary-tab';
import MainSearchTab from './main-search-tab/main-search-tab';
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
        waitingForSingleItem: PropTypes.bool,
        tempDescription: PropTypes.string,
        unfocusItem: PropTypes.bool,
        setSidebarWidth: PropTypes.func.isRequired,
        toggleSidebarDrag: PropTypes.func.isRequired,
        width: PropTypes.number.isRequired,
        fetchItemTypes: PropTypes.func.isRequired,
        itemTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
        hasFullText: PropTypes.bool,
        globalAndOr: PropTypes.string,
        searchGroups: PropTypes.arrayOf(PropTypes.object),
    };

    constructor(props) {
        super(props);
        const { width } = this.props;
        this.state = {
            width,
            startWidth: width,
            minWidth: 200,
            maxWidth: window.innerWidth - 300,
            newWidth: null,
            mouseStart: null,
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleWindowResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
    }

    handleWindowResize = () => {
        const { width, setSidebarWidth } = this.props;
        const newMaxWidth = window.innerWidth - 300;
        this.setState({
            maxWidth: newMaxWidth,
            startWidth: width > newMaxWidth ? newMaxWidth : width,
        });
        if (width > newMaxWidth) {
            setSidebarWidth(newMaxWidth);
        }
    }

    handleStartResize = (e) => {
        const { toggleSidebarDrag } = this.props;
        e.preventDefault();
        this.setState({
            mouseStart: e.clientX,
            isResizing: true,
        });
        toggleSidebarDrag();
        window.addEventListener('mousemove', this.handleResize);
        window.addEventListener('mouseup', this.handleEndResize);
    }

    handleResize = (e) => {
        const { startWidth, minWidth, maxWidth, mouseStart } = this.state;
        const { setSidebarWidth } = this.props;
        const mouseDistance = e.clientX - mouseStart;
        const newWidth = startWidth - mouseDistance;
        if (newWidth >= minWidth && newWidth < maxWidth) {
            setSidebarWidth(newWidth);
        }
    }

    handleEndResize = () => {
        const { toggleSidebarDrag, width } = this.props;
        const { isResizing } = this.state;
        if (isResizing) {
            this.setState({
                isResizing: false,
                startWidth: width,
            });
            toggleSidebarDrag();
            window.removeEventListener('mousemove', this.handleResize);
            window.removeEventListener('mouseup', this.handleEndResize);
        }
    }

    handleTabClicked = (tabName) => {
        const { updateTabVisibility, visibleTab } = this.props;
        if (visibleTab !== tabName) {
            updateTabVisibility(tabName);
        }
    }

    handleSidebarToggleClicked = () => {
        const { updateVisibility, visible, unfocusItem = true } = this.props;
        updateVisibility(!visible, unfocusItem);
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
            </div>
        );
    }

    renderPanel() {
        const { visibleTab, activeItem, activeItemEditing, toggleMetadataEditMode, toggleDescriptionEditMode, updateMetadata,
            saveMetadata, saveTags, updateDescription, saveDescription, metadataEditMode, descriptionEditMode, tempDescription,
            fetchItemTypes, itemTypes, hasFullText, searchGroups, dispatch, globalAndOr } = this.props;
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

        const searchTabProps = {
            fetchItemTypes,
            itemTypes,
            hasFullText,
            globalAndOr,
            searchGroups,
        };

        switch (visibleTab) {
            case SIDEBAR_TABS.SUMMARY:
                if (activeItem) {
                    return (<SummaryTab {...summaryTabProps} />);
                }
                return (
                    <div className='sidebar-no-item'>
                        <span>Please select an item on the table to the left.</span>
                    </div>
                );
            case SIDEBAR_TABS.SEARCH:
                return (<MainSearchTab {...searchTabProps} {...bindActionCreators(searchActionCreators, dispatch)} />);
            default:
                return null;
        }
    }

    render() {
        const { visible, waitingForSingleItem, width } = this.props;
        return (
            <div className='sidebar-wrapper'>
                <Loader visible={waitingForSingleItem} />
                <div
                    onMouseDown={this.handleStartResize}
                    onMouseUp={this.handleEndResize}
                    className={`sidebar-toggler ${visible ? 'opened' : 'closed'}`}
                    title='Resize sidebar'
                >
                    <div
                        className={`sidebar-toggler-button ${visible ? 'opened' : 'closed'}`}
                        onClick={this.handleSidebarToggleClicked}
                        title='Toggle sidebar'
                        onMouseDown={e => e.stopPropagation()}
                    >
                        <i className={visible ? 'icon-arrow-right2' : 'icon-arrow-left2'} />
                    </div>
                </div>
                {visible ? (
                    <div className='sidebar' ref={(sidebar) => { this.sidebar = sidebar; }} style={{ width }}>
                        {this.renderTabs()}
                        {this.renderPanel()}
                    </div>
                ) : null}
            </div>
        );
    }
}
