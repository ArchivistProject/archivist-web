import React, { PropTypes, Component } from 'react';
import pdflib from 'pdfjs-dist';
import worker from 'pdfjs-dist/build/pdf.worker';
import { Sidebar } from '~/src/views';
import Paginator from '~/src/components/paginator/paginator';
import doc from '~/src/assets/multi.pdf';
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
    }

    shouldComponentUpdate() {
        return !!this.svg;
    }

    handleScaleClicked = (increment) => {
        const { updateScale } = this.props;
        updateScale(increment);
    }

    handleResetClicked = () => {
        const { resetScale } = this.props;
        resetScale();
    }

    render() {
        const { scale, scaleMin, scaleMax, currentPage, updatePage, sidebarVisible } = this.props;
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
                const reduceScale = sidebarVisible ? 0.8 : 0.98;
                const viewport = pdfPage.getViewport(reduceScale * ((window.innerWidth) / pdfPage.getViewport(scale).width));
                pageContainer.width = `${viewport.width}px`;
                pageContainer.height = `${viewport.height}px`;

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
                <div className='viewer-wrapper'>
                    <div className='viewer-container' ref={(c) => { this.viewer = c; }} />
                    <Sidebar unfocusItem={false} />
                </div>
            </div>
        );
    }
}
