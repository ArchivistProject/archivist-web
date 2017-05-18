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
        editHighlight: PropTypes.func.isRequired,
        deleteHighlight: PropTypes.func.isRequired,
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
        highlighter: PropTypes.string,
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
            selectedHighlightRect: null,
            highlightId: '',
            selectedHighlight: null,
            wasHighlightJustSelected: false,
            selection: null,
            currentHighlightId: 0,
            highlightCounter: 0,
        };
        // State that needs to be updated synchronously and is NOT used when rendering
        this.syncState = {
            elementCounter: 0,
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
        window.hl = () => console.log(this.highlighter);
    }

    componentWillReceiveProps(nextProps) {
        const { highlights: newHighlights } = nextProps;
        const { highlights } = this.props;
        if (newHighlights.length) {
            console.log(newHighlights[newHighlights.length - 1]);
            this.setState({
                currentHighlightId: newHighlights[newHighlights.length - 1].highlightId,
            });
        }
        if (newHighlights.length < highlights.length) {
            const removedIndex = highlights.indexOf(highlights.find(highlight => newHighlights.indexOf(highlight) === -1));
        }
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
                selectedHighlight: null,
                selectedHighlightRect: null,
                selection,
            });
        } else {
            this.setState({
                annotationVisible: false,
                selectionRect: null,
                selectedHighlight: null,
                selectedHighlightRect: null,
                selection: null,
            });
        }
    }

    createHighlighter = () => {
        const { activeItemContentType, highlighter } = this.props;
        if (activeItemContentType === CONTENT_TYPES.WEB) {
            this.highlighter = rangy.createHighlighter(this.webContainer.contentDocument);
        } else {
            this.highlighter = rangy.createHighlighter();
        }
        this.highlighter.addClassApplier(rangy.createClassApplier('archivist-highlight', {
            ignoreWhiteSpace: true,
            tagNames: ['*'],
            onElementCreate: this.onHighlightCreate,
        }));

        if (highlighter) {
            this.highlighter.deserialize(highlighter);
        }
    }

    handleHighlightAdded = (note) => {
        const { addHighlight } = this.props;
        const { selection, highlightedText } = this.state;
        // const highlightId = shortid.generate();
        // this.highlighter.highlightSelection('archivist-highlight');
        const { startOffset } = selection.getRangeAt(0);
        this.setState({ highlightId: startOffset }, () => {
            this.syncState.elementCounter = 0;
            console.log('===> START ADDING');
            this.highlighter.highlightSelection('archivist-highlight');
            console.log('<=== STOP ADDING, total:', this.elementCounter);
            addHighlight(this.highlighter, this.state.highlightId, this.syncState.elementCounter, highlightedText, note);
            if (selection) {
                selection.empty();
            }
        });

        this.setState({
            annotationVisible: false,
            annotationX: null,
            annotationY: null,
            highlightedText: '',
            selection: null,
            selectionRect: null,
        });
    }

    handleHighlightEdited = (newNote) => {
        const { editHighlight } = this.props;
        const { selectedHighlight } = this.state;
        editHighlight(selectedHighlight, newNote);
        this.handleCancel();
    }

    handleCancel = () => {
        this.setState({
            annotationVisible: false,
            highlightedText: '',
            selectionRect: null,
            selectedHighlightRect: null,
            highlightId: '',
            selectedHighlight: null,
        });
    }

    handleHighlightDeleted = (highlight) => {
        const { deleteHighlight } = this.props;
        this.highlighter.unhighlightSelection();
        deleteHighlight(this.highlighter, highlight);
        this.handleCancel();
    }

    handleHighlightSelected = (e, element, highlightId) => {
        e.stopPropagation();

        const { highlights } = this.props;
        if (!this.state.editMode) {
            this.setState({
                editMode: true,
                selectedHighlight: null,
                selectedHighlightRect: null,
            });
        }

        console.log(highlightId);
        const newHighlight = highlights.find(highlight => highlight.highlightId === highlightId);
        console.log(newHighlight);
        this.setState({
            annotationVisible: true,
            selectedHighlight: newHighlight,
            selectedHighlightRect: element.getBoundingClientRect(),

        });
    }

    onHighlightCreate = (element, classApplier) => {
        const { highlights } = this.props;
        const { highlightId, currentHighlightId, highlightCounter } = this.state;
        console.log(element, currentHighlightId);
        element.onclick = e => this.handleHighlightSelected(e, element, highlightId || currentHighlightId);
        this.syncState.elementCounter += 1;
        console.log('CREATING A HIGHLIGHT', this.syncState.elementCounter);
        if (!highlightId) {
            const numHighlights = highlights.length;
            this.setState({
                currentHighlightId: numHighlights > highlightCounter + 1 ? highlights[(numHighlights - 1) - (this.state.highlightCounter + 1)].highlightId : null,
                highlightCounter: this.state.highlightCounter += 1,
            });
        }
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
        const { annotationVisible, selectionRect, selectedHighlightRect, selectedHighlight } = this.state;
        return (
            <div className='viewer'>
                <div className='viewer-wrapper'>
                    <div className='viewer-parent'>
                        <Loader visible={waitingForSingleItem} />
                        {this.renderToolbar()}
                        <div className='viewer-container' ref={(c) => { this.viewer = c; }}>
                            {annotationVisible ?
                                <Annotation
                                    selectionRect={selectionRect}
                                    selectedHighlightRect={selectedHighlightRect}
                                    addHighlight={this.handleHighlightAdded}
                                    editHighlight={this.handleHighlightEdited}
                                    deleteHighlight={this.handleHighlightDeleted}
                                    selectedHighlight={selectedHighlight}
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
