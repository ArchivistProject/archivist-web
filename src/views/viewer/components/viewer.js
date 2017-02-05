import React, { PropTypes, Component } from 'react';
import pdflib from 'pdfjs-dist';
import worker from 'pdfjs-dist/build/pdf.worker';
import { Sidebar } from '~/src/views';
import viewerActionCreators from '~/src/state/viewer/viewer-action-creators';
import doc from '~/src/assets/test.pdf';
import './viewer.scss';

export default class Viewer extends Component {

    static propTypes = {
    };

    render() {
        // <div className='viewer-container'>
        //  <div className='-page-1'><svg elements></div>
        //  <div className='-page-2'><svg elements></div>
        //  <div className='-page-3'><svg elements></div>
        // </div>
        const scale = 1.0;
        pdflib.PDFJS.workerSrc = worker;
        pdflib.PDFJS.getDocument(doc).then((pdf) => {
            for (let i = 1; i <= pdf.pdfInfo.numPages; i += 1) {
                const pageContainer = document.createElement('div');
                pageContainer.className += `page-${i}`;
                this.viewer.appendChild(pageContainer);
                pdf.getPage(i).then((pdfPage) => {
                    // Get viewport for the page. Use the window's current width / the page's viewport at the current scale
                    // TODO: change this if the sidebar is open
                    const viewport = pdfPage.getViewport((window.innerWidth - 300) / pdfPage.getViewport(scale).width);
                    pageContainer.width = `${viewport.width}px`;
                    pageContainer.height = `${viewport.height}px`;

                    // Render the SVG element and add it as a child to the page container
                    pdfPage.getOperatorList()
                        .then((opList) => {
                            const svgGfx = new pdflib.PDFJS.SVGGraphics(pdfPage.commonObjs, pdfPage.objs);
                            return svgGfx.getSVG(opList, viewport);
                        })
                            .then((svg) => {
                                pageContainer.appendChild(svg);
                            });
                });
            }
        });

        // console.log(this.props.params); // item id
        return (
            <div className='viewer'>
                <div className='viewer-container' ref={(c) => { this.viewer = c; }} />
                <Sidebar />
            </div>
        );
    }
}
