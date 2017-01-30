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

    onDocumentComplete = () => {
        console.log('doc complete');
    }
    onPageComplete = () => {
        console.log('page complete');
    }
    //<iframe
      //  id='object'
       // height='100%'
       // width='100%'
      //  type='application/pdf'
      //  src={doc}
    // />

    render() {
        console.log(pdflib);
        console.log(worker);
        pdflib.PDFJS.workerSrc = worker;
        pdflib.PDFJS.getDocument(doc).then((pdf) => {
            pdf.getPage(1).then((page) => {
                const pdfPageView = new pdflib.PDFJS.PDFPageView({
                    container: this.pdfcontainer,
                    id: 1,
                    scale: 1,
                    defaultViewport: page.getViewport(1),
                    // We can enable text/annotations layers, if needed
                    // textLayerFactory: new pdflib.PDFJS.DefaultTextLayerFactory(),
                    annotationLayerFactory: new pdflib.PDFJS.DefaultAnnotationLayerFactory(),
                });
                   // Associates the actual page with the view, and drawing it
                pdfPageView.setPdfPage(page);
                pdfPageView.draw();
                // const viewport = page.getViewport(1);
                // const canvas = this.pdf;
                // const canvasContext = canvas.getContext('2d');
                // const renderContext = {
                //     canvasContext,
                //     viewport,
                // };
                // canvas.height = viewport.height;
                // canvas.width = viewport.width;
                // page.render(renderContext);
            });
        });

        // console.log(this.props.params); // item id
        return (
            <div className='viewer'>
                <div className='viewer-content'>
                    <div ref={(c) => { this.pdfcontainer = c; }} />
                </div>
            </div>
        );
    }
}
