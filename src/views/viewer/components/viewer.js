import React, { PropTypes, Component } from 'react';
import pdflib from 'pdfjs-dist';
import $ from 'jquery';
import { Sidebar } from '~/src/views';
import Paginator from '~/src/components/paginator/paginator';
import Loader from '~/src/components/loader/loader';
import { CONTENT_TYPES } from '~/src/state/viewer/viewer-constants';
import { throttle, getScrollbarWidth } from '~/src/utils/utils';
import './viewer.scss';

const gutter = 15 / 3; // width of sidebar resizer
const scrollbarWidth = getScrollbarWidth();

export default class Viewer extends Component {

    static propTypes = {
        activeItem: PropTypes.object,
        activeItemContent: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        activeItemContentType: PropTypes.string,
        updateScale: PropTypes.func.isRequired,
        resetScale: PropTypes.func.isRequired,
        updatePage: PropTypes.func.isRequired,
        fetchItem: PropTypes.func.isRequired,
        linkClicked: PropTypes.func.isRequired,
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
    };

    componentWillMount() {
        const { activeItem, fetchItem, fetchItemContent, params: { itemId } } = this.props;
        if (!activeItem) {
            fetchItem(itemId);
        } else {
            fetchItemContent(activeItem);
        }
        window.addEventListener('resize', this.handleResize);
    }

    componentDidMount() {
        const { sidebarVisible, sidebarWidth } = this.props;
        this.viewer.style.width = `${window.innerWidth - (sidebarVisible ? sidebarWidth + gutter + scrollbarWidth : 0)}px`;
    }

    addURLIntercept = () => {
      const { linkClicked } = this.props;
      // TODO: what happens when doc page has iframes in it?
      var s = document.getElementsByClassName('web-container');
      if (!s || s.length == 0) { return; }
      var d = s[0].contentWindow.document;
      if (!d) { return; }
      var self = this;
      $('a', d).each((pos, a) => {
          a.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation();
            self.props.linkClicked(a.href);
          });
      });
    }

    shouldComponentUpdate(nextProps) {
        const { activeItemContentType } = this.props;
        if (activeItemContentType === CONTENT_TYPES.PDF) {
            return !!this.svg;
        }
        return true;
    }

    componentDidUpdate() {
        const { sidebarVisible, sidebarWidth, activeItem, fetchItemContent, activeItemContent } = this.props;
        this.viewer.style.width = `${window.innerWidth - (sidebarVisible ? sidebarWidth + gutter + scrollbarWidth : 0)}px`;
        if (!activeItemContent) {
            fetchItemContent(activeItem);
        }
        var s = document.getElementsByClassName('web-container')
        if (!s || s.length == 0) { return; }
        var self = this;
        s[0].addEventListener('load', e => {
          self.addURLIntercept();
        });
    }

    componentWillUnmount() {
        const { viewerClosed } = this.props;
        viewerClosed();
        window.removeEventListener('resize', this.handleResize);
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

    renderToolbar() {
        const { scale, scaleMax, scaleMin, activeItemContentType, currentPage, numPages, updatePage } = this.props;
        if (activeItemContentType === 'application/pdf') {
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
                        <iframe className='web-container' srcDoc={activeItemContent} />
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
                const pageContainer = document.createElement('div');
                pageContainer.className += 'viewer-page';
                this.viewer.appendChild(pageContainer);
                activeItemContent.getPage(currentPage).then((pdfPage) => {
                    // Get viewport for the page. Use the window's current width / the page's viewport at the current scale
                    const reduceScale = sidebarVisible ? (window.innerWidth - sidebarWidth) / window.innerWidth : 1;
                    const viewport = pdfPage.getViewport(reduceScale * ((window.innerWidth) / pdfPage.getViewport(scale).width));

                    pageContainer.width = `${viewport.width}px`;
                    pageContainer.height = `${viewport.height}px`;
                    this.viewer.style.width = `${window.innerWidth - (sidebarVisible ? sidebarWidth + gutter + scrollbarWidth : 0)}px`;

                    // Render the SVG element and add it as a child to the page container
                    pdfPage.getOperatorList()
                        .then((opList) => {
                            const svgGfx = new pdflib.PDFJS.SVGGraphics(pdfPage.commonObjs, pdfPage.objs);
                            return svgGfx.getSVG(opList, viewport);
                        })
                            .then((svg) => {
                                this.svg = svg;
                                pageContainer.appendChild(svg);
                            });
                });
                return null;
            }
        }
        return null;
    }

    render() {
        const { waitingForSingleItem } = this.props;
        return (
            <div className='viewer'>
                <div className='viewer-wrapper'>
                    <div className='viewer-parent'>
                        <Loader visible={waitingForSingleItem} />
                        {this.renderToolbar()}
                        <div className='viewer-container' ref={(c) => { this.viewer = c; }}>
                            {this.renderContent()}
                        </div>
                    </div>
                    <Sidebar unfocusItem={false} />
                </div>
            </div>
        );
    }
}
