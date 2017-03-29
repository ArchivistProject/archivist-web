import React, { PropTypes, Component } from 'react';
import { formatDate, throttle } from '~/src/utils/utils';
import { SIDEBAR_TABS } from '~/src/state/sidebar/sidebar-constants';
import Loader from '~/src/components/loader/loader';
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
        waitingForSingleItem: PropTypes.bool,
        tempDescription: PropTypes.string,
        unfocusItem: PropTypes.bool,
    };

    constructor(props) {
        super(props);
        console.log('here');
        this.state = {
            width: 300,
            minWidth: 200,
            newWidth: null,
            mouseStart: null,
        };
    }

    handleStartResize = (e) => {
        console.log(this.state);
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            mouseStart: e.clientX,
        });
        window.addEventListener('mousemove', this.handleResize);
        window.addEventListener('mouseup', this.handleEndResize);
    }

    handleResize = (e) => {
        const { width, minWidth, mouseStart } = this.state;
        const mouseDistance = e.clientX - mouseStart;
        const newWidth = width - mouseDistance;
        if (newWidth >= minWidth && newWidth < window.innerWidth) {
            console.log(newWidth);
            this.sidebar.style.width = `${newWidth}px`;
            this.setState({
                newWidth,
            });
        }
    }

    handleEndResize = () => {
        const { newWidth } = this.state;
        this.setState({
            width: newWidth,
        });
        window.removeEventListener('mousemove', this.handleResize);
        window.removeEventListener('mouseup', this.handleEndResize);
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
        if (activeItem) {
            switch (visibleTab) {
                case SIDEBAR_TABS.SUMMARY:
                    return (<SummaryTab {...summaryTabProps} />);
                case SIDEBAR_TABS.SEARCH:
                    return (<MainSearchTab />);
                default:
                    return null;
            }
        }
        return (
            <div className='sidebar-no-item'>
                <span>No item selected.</span>
            </div>
        );
    }

    render() {
        const { visible, waitingForSingleItem } = this.props;
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
                    >
                        <i className={visible ? 'icon-arrow-right2' : 'icon-arrow-left2'} />
                    </div>
                </div>
                {visible ? (
                    <div className='sidebar' ref={(sidebar) => { this.sidebar = sidebar; }}>
                        {this.renderTabs()}
                        {this.renderPanel()}
                    </div>
                ) : null}
            </div>
        );
    }
}
