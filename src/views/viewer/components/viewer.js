import React, { PropTypes, Component } from 'react';
import pdflib from 'pdfjs-dist';
import rangy from 'rangy';
import shortid from 'shortid';
import rangyHighlight from 'rangy/lib/rangy-highlighter';
import rangyClassApplier from 'rangy/lib/rangy-classapplier';
import { Sidebar } from '~/src/views';
import Paginator from '~/src/components/paginator/paginator';
import Loader from '~/src/components/loader/loader';
import Annotation from '~/src/components/annotation/annotation';
import { CONTENT_TYPES } from '~/src/state/viewer/viewer-constants';
import { throttle, getScrollbarWidth } from '~/src/utils/utils';
import './viewer.scss';

const gutter = 15 / 3; // width of sidebar resizer
const scrollbarWidth = getScrollbarWidth();
const noteCssPath = '/assets/css/notes.css'; // path for note css, used for inserting into iframe

export default class Viewer extends Component {

    static propTypes = {
        activeItem: PropTypes.object,
        activeItemContent: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        activeItemContentType: PropTypes.string,
        updateScale: PropTypes.func.isRequired,
        resetScale: PropTypes.func.isRequired,
        updatePage: PropTypes.func.isRequired,
        addHighlight: PropTypes.func.isRequired,
        // deleteHighlight: PropTypes.func.isRequired,
        fetchItem: PropTypes.func.isRequired,
        fetchItemContent: PropTypes.func.isRequired,
        scale: PropTypes.number.isRequired,
        scaleMin: PropTypes.number.isRequired,
        scaleMax: PropTypes.number.isRequired,
        currentPage: PropTypes.number,
        numPages: PropTypes.number,
        sidebarVisible: PropTypes.bool.isRequired,
        sidebarWidth: PropTypes.number.isRequired,
        sidebarIsDragging: PropTypes.bool.isRequired,
        params: PropTypes.object.isRequired,
        viewerClosed: PropTypes.func.isRequired,
        waitingForSingleItem: PropTypes.bool,
        highlights: PropTypes.array,
    };

    constructor(props) {
        super(props);
        this.state = {
            webContentLoaded: false,
            itemLoadListenerExists: false,
            itemClickListenerExists: false,
            annotationVisible: false,
            highlightedText: '',
            selectionRect: null,
            selectedHighlightsRects: [],
            highlightId: '',
            selectedHighlights: [],
        };
    }
    componentWillMount() {
        const { activeItem, fetchItem, fetchItemContent, params: { itemId } } = this.props;
        if (!activeItem) {
            fetchItem(itemId);
        } else {
            fetchItemContent(activeItem);
        }
        window.addEventListener('resize', this.handleResize);
        rangy.init();
    }

    componentDidMount() {
        const { sidebarVisible, sidebarWidth } = this.props;
        this.viewer.style.width = `${window.innerWidth - (sidebarVisible ? sidebarWidth + gutter + scrollbarWidth : 0)}px`;
        document.addEventListener('click ', e => this.handleClick(e));
    }

    shouldComponentUpdate(nextProps) {
        const { activeItemContentType, currentPage, scale } = this.props;
        if (activeItemContentType === CONTENT_TYPES.PDF && currentPage === nextProps.currentPage && scale === nextProps.scale) {
            return false;
        }
        return true;
    }

    componentDidUpdate() {
        const { activeItemContentType, sidebarVisible, sidebarWidth, activeItem, fetchItemContent, activeItemContent } = this.props;
        const { itemLoadListenerExists, itemEventListenerExists, webContentLoaded } = this.state;
        this.viewer.style.width = `${window.innerWidth - (sidebarVisible ? sidebarWidth + gutter + scrollbarWidth : 0)}px`;
        if (!activeItemContent) {
            fetchItemContent(activeItem);
            return;
        }

        switch (activeItemContentType) {
            case CONTENT_TYPES.WEB:
                if (this.webContainer) {
                    if (!itemLoadListenerExists) {
                        this.webContainer.addEventListener('load', this.handleContentLoaded);
                        this.setState({ itemLoadListenerExists: true });
                    }
                    if (webContentLoaded && !itemEventListenerExists) {
                        this.webContainer.contentDocument.addEventListener('click', this.handleClick);
                        this.setState({ itemEventListenerExists: true });
                    }
                }
                break;

            case CONTENT_TYPES.PDF:
                if (!itemEventListenerExists) {
                    this.setState({ itemEventListenerExists: true });
                    document.addEventListener('click', this.handleClick);
                }
                break;
        }
    }

    componentWillUnmount() {
        const { activeItemContentType, viewerClosed } = this.props;
        const { itemLoadListenerExists, itemEventListenerExists } = this.state;
        viewerClosed();
        window.removeEventListener('resize', this.handleResize);
        switch (activeItemContentType) {
            case CONTENT_TYPES.WEB:
                if (this.webContainer) {
                    if (itemLoadListenerExists) {
                        this.webContainer.removeEventListener('load', this.handleContentLoaded);
                    }
                    if (itemEventListenerExists) {
                        this.webContainer.contentDocument.removeEventListener('click', this.handleClick);
                    }
                }
                break;

            case CONTENT_TYPES.PDF:
                document.removeEventListener('click', this.handleClick);
                break;
        }
    }

    handleResize = () => {
        throttle(() => this.forceUpdate(), 100).call();
    }

    handleScaleClicked = (increment) => {
        const { updateScale } = this.props;
        updateScale(increment);
    }

    handleResetClicked = () => {
        const { resetScale } = this.props;
        resetScale();
    }

    handleClick = (e) => {
        const { activeItemContentType } = this.props;

        // Reset selected highlights
        // this.setState({
        //     selectedHighlights: [],
        //     selectedHighlightsRects: [],
        // });

        let selection;
        switch (activeItemContentType) {
            case CONTENT_TYPES.WEB:
                selection = this.webContainer.contentWindow.getSelection();
                break;
            default:
                selection = window.getSelection();
                break;
        }
        if (selection.toString() !== '') {
            const selectionRect = selection.getRangeAt(0).getBoundingClientRect();
            this.setState({
                annotationVisible: true,
                highlightedText: selection.toString(),
                selectionRect,
            });
        } else {
            console.log('nothing selected');
            if (!this.state.selectedHighlights.length) {
                this.setState({
                    annotationVisible: false,
                    selectionRect: null,
                });
            }
        }
    }

    createHighlighter = () => {
        this.highlighter = rangy.createHighlighter(this.webContainer.contentDocument);
        // this.highlighter.addClassApplier(rangy.createClassApplier('archivist-highlight', {
        //     ignoreWhiteSpace: true,
        //     tagNames: ['*'],
        //     onElementCreate: this.onHighlightCreate,
        // }));
    }

    handleHighlightAdded = (note) => {
        const { addHighlight } = this.props;
        const highlightId = shortid.generate();
        this.highlighter.addClassApplier(rangy.createClassApplier(`archivist-highlight-${highlightId}`, {
            ignoreWhiteSpace: true,
            tagNames: ['*'],
            onElementCreate: this.onHighlightCreate,
        }));
        this.setState({ highlightId }, () => {
            this.highlighter.highlightSelection(`archivist-highlight-${highlightId}`, { exclusive: true });
            addHighlight(this.highlighter, highlightId, this.state.highlightedText, note);
        });

        this.setState({
            annotationVisible: false,
            annotationX: null,
            annotationY: null,
        });
    }

    handleHighlightEdited = () => {
        const { selectedHighlights, selectedHighlightsRects } = this.state;
        console.log(`edit ${selectedHighlights} ${selectedHighlightsRects}`);
    }

    handleCancel = () => {
        this.setState({
            annotationVisible: false,
            highlightedText: '',
            selectionRect: null,
            selectedHighlightsRects: [],
            highlightId: '',
            selectedHighlights: [],
        });
    }

    handleHighlightDeleted = () => {
        this.highlighter.unhighlightSelection();
        this.handleCancel();
    }

    handleHighlightSelected = (element, highlightId) => {
        const { highlights } = this.props;
        if (!this.state.editMode) {
            this.setState({
                editMode: true,
                selectedHighlights: [],
                selectedHighlightsRects: [],
            });
        }
        const newHighlight = highlights.find(highlight => highlight.highlightId === highlightId);
        const updatedSelectedHighlights = [...this.state.selectedHighlights, newHighlight];

        this.setState({
            annotationVisible: true,
            selectedHighlights: updatedSelectedHighlights,
            selectedHighlightsRects: [...this.state.selectedHighlightsRects, element.getBoundingClientRect()],
        });
    }

    onHighlightCreate = (element, classApplier) => {
        const { highlightId } = this.state;
        element.onclick = () => this.handleHighlightSelected(element, highlightId);
    }

    handleContentLoaded = () => {
        const cssLink = document.createElement('link');
        cssLink.href = noteCssPath;
        cssLink.rel = 'stylesheet';
        cssLink.type = 'text/css';
        this.webContainer.contentDocument.body.appendChild(cssLink);
        this.createHighlighter();
        this.setState({
            webContentLoaded: true,
        });
    }

    renderToolbar() {
        const { scale, scaleMax, scaleMin, activeItemContentType, currentPage, numPages, updatePage } = this.props;
        if (activeItemContentType === CONTENT_TYPES.PDF) {
            return (
                <div className='viewer-toolbar'>
                    <div className='viewer-toolbar-zoom'>
                        <button className='viewer-zoom' onClick={() => this.handleScaleClicked(true)} disabled={scale >= scaleMax}>
                            <i className='icon-zoom-out' />
                        </button>

                        <div className='scale'>{scale}</div>

                        <button className='viewer-zoom' onClick={() => this.handleScaleClicked(false)} disabled={scale <= scaleMin}>
                            <i className='icon-zoom-in' />
                        </button>

                        <button onClick={this.handleResetClicked} disabled={scale === 1}>Reset</button>
                    </div>
                    <Paginator
                        currentPage={currentPage}
                        totalPages={numPages}
                        onPageChange={updatePage}
                    />
                    <div />
                </div>
            );
        }
        return null;
    }

    renderContent() {
        const { activeItemContent, activeItemContentType, scale, currentPage, sidebarVisible, sidebarWidth, sidebarIsDragging } = this.props;
        switch (activeItemContentType) {
            case CONTENT_TYPES.WEB: {
                return (
                    <div className='web-wrapper'>
                        {sidebarIsDragging ? <div className='web-container-overlay' /> : null}
                        <iframe
                            className='web-container'
                            ref={(ref) => { this.webContainer = ref; }}
                            srcDoc={activeItemContent}
                            onClick={() => { rangyHighlight.highlightSelection('test'); }}
                        />
                    </div>
                );
            }
            case CONTENT_TYPES.PDF: {
                // clear out the current page to replace it
                if (this.viewer) {
                    while (this.viewer.firstChild) {
                        this.viewer.removeChild(this.viewer.firstChild);
                    }
                }
                activeItemContent.getPage(currentPage).then((pdfPage) => {
                    // Get viewport for the page. Use the window's current width / the page's viewport at the current scale
                    const reduceScale = sidebarVisible ? (window.innerWidth - sidebarWidth) / window.innerWidth : 1;
                    const viewport = pdfPage.getViewport(reduceScale * ((window.innerWidth) / pdfPage.getViewport(scale).width));
                    this.viewer.style.width = `${window.innerWidth - (sidebarVisible ? sidebarWidth + gutter + scrollbarWidth : 0)}px`;

                    const canvasWrapper = document.createElement('div');
                    const canvas = document.createElement('canvas');
                    const textLayerDiv = document.createElement('div');
                    textLayerDiv.className = 'textLayer';

                    canvasWrapper.appendChild(canvas);
                    this.viewer.appendChild(canvasWrapper);
                    this.viewer.appendChild(textLayerDiv);

                    canvas.width = viewport.width;
                    canvas.height = viewport.height;
                    canvas.style.width = '100%';
                    canvas.style.height = '100%';

                    const context = {
                        canvasContext: canvas.getContext('2d'),
                        viewport,
                    };

                    pdfPage.render(context);
                    pdfPage.getTextContent().then((textContent) => {
                        pdflib.renderTextLayer({
                            textContent,
                            container: textLayerDiv,
                            viewport,
                        });
                    });
                });
                if (!this.highlighter) {
                    this.createHighlighter();
                }
                return null;
            }
        }
        return null;
    }

    render() {
        const { waitingForSingleItem } = this.props;
        const { annotationVisible, highlightedText, selectionRect, selectedHighlightsRects, selectedHighlights } = this.state;
        return (
            <div className='viewer'>
                <div className='viewer-wrapper'>
                    <div className='viewer-parent'>
                        <Loader visible={waitingForSingleItem} />
                        {this.renderToolbar()}
                        <div className='viewer-container' ref={(c) => { this.viewer = c; }}>
                            {annotationVisible ?
                                <Annotation
                                    highlightedText={highlightedText}
                                    selectionRect={selectionRect}
                                    selectedHighlightsRects={selectedHighlightsRects}
                                    addHighlight={this.handleHighlightAdded}
                                    editHighlight={this.handleHighlightEdited}
                                    deleteHighlight={this.handleHighlightDeleted}
                                    cancel={this.handleCancel}
                                    selectedHighlights={selectedHighlights}
                                /> : null}
                            {this.renderContent()}
                        </div>
                    </div>
                    <Sidebar unfocusItem={false} />
                </div>
            </div>
        );
    }
}
