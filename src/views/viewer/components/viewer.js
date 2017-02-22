import React, { PropTypes, Component } from 'react';
import pdflib from 'pdfjs-dist';
import worker from 'pdfjs-dist/build/pdf.worker';
import { Sidebar } from '~/src/views';
import Paginator from '~/src/components/paginator/paginator';
import doc from '~/src/assets/multi.pdf';
import test from '~/src/assets/test.html';
import './viewer.scss';

export default class Viewer extends Component {

    static propTypes = {
        activeItem: PropTypes.object,
        updateScale: PropTypes.func.isRequired,
        resetScale: PropTypes.func.isRequired,
        updatePage: PropTypes.func.isRequired,
        fetchItem: PropTypes.func.isRequired,
        scale: PropTypes.number.isRequired,
        scaleMin: PropTypes.number.isRequired,
        scaleMax: PropTypes.number.isRequired,
        currentPage: PropTypes.number.isRequired,
        sidebarVisible: PropTypes.bool.isRequired,
        params: PropTypes.object.isRequired,
    };

    componentWillMount() {
        const { activeItem, fetchItem, params: { itemId } } = this.props;
        if (!activeItem) {
            fetchItem(itemId);
        }
        window.addEventListener('resize', this.throttle(() => this.forceUpdate(), 200));
    }

    shouldComponentUpdate() {
        return !!this.svg;
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.throttle(() => this.forceUpdate(), 200));
    }

    throttle = (callback, limit) => {
        let wait = false;
        return () => {
            if (!wait) {
                callback.call();
                wait = true;
                setTimeout(() => {
                    wait = false;
                }, limit);
            }
        };
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
        const { scale, scaleMax, scaleMin, currentPage, updatePage } = this.props;
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
                    totalPages={3}
                    onPageChange={updatePage}
                />
                <div />
            </div>
        );
    }

    render() {
        const { scale, currentPage, sidebarVisible } = this.props;
        if (this.viewer) {
            this.viewer.innerHTML = '';
        }
        pdflib.PDFJS.workerSrc = worker;
        pdflib.PDFJS.getDocument(doc).then((pdf) => {
            const pageContainer = document.createElement('div');
            pageContainer.className += 'viewer-page';
            this.viewer.appendChild(pageContainer);
            pdf.getPage(currentPage).then((pdfPage) => {
                // Get viewport for the page. Use the window's current width / the page's viewport at the current scale
                const reduceScale = sidebarVisible ? 0.65 : 0.95;
                const viewport = pdfPage.getViewport(reduceScale * ((window.innerWidth) / pdfPage.getViewport(scale).width));

                pageContainer.width = `${viewport.width}px`;
                pageContainer.height = `${viewport.height}px`;
                this.viewer.style.width = `${window.innerWidth - (sidebarVisible ? 330 : 21)}px`;

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
        });

        return (
            <div className='viewer'>
                <div className='viewer-wrapper'>
                    <div>
                        {this.renderToolbar()}
                        <div className='viewer-container' ref={(c) => { this.viewer = c; }} />
                    </div>
                    <Sidebar unfocusItem={false} />
                </div>
            </div>
        );
    }
}
