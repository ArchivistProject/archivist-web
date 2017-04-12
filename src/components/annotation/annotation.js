import React, { PropTypes, Component } from 'react';
import './annotation.scss';

export default class Annotation extends Component {

    static propTypes = {
        selectionRect: PropTypes.object,
        selectedHighlightsRects: PropTypes.arrayOf(PropTypes.object),
        highlightedText: PropTypes.string,
        selectedHighlights: PropTypes.arrayOf(PropTypes.object),
        addHighlight: PropTypes.func.isRequired,
        editHighlight: PropTypes.func.isRequired,
        deleteHighlight: PropTypes.func.isRequired,
        cancel: PropTypes.func.isRequired,
    };

    // constructor(props) {
    //     super(props);
    // }

    render() {
        const { highlightedText, selectedHighlights, selectionRect, selectedHighlightsRects, addHighlight, editHighlight, deleteHighlight, cancel } = this.props;
        const annotationWidth = 200; // width of popup
        console.log(selectedHighlights);
        let style = {};
        const rect = selectionRect || selectedHighlightsRects[0];
        if (rect) {
            let left = (rect.left + ((rect.right - rect.left) / 2)) - (annotationWidth / 2);
            left = left < 0 ? 10 : left;
            style = {
                top: rect.top + 20,
                left,
            };
        }

        console.log(selectedHighlights.length);
        return selectedHighlights.length > 0 ?
            <div className='annotation' style={style}>
                <div className='annotation-toolbar'>
                    <button className='annotation-toolbar-button' onClick={addHighlight}>Add</button>
                    <button className='annotation-toolbar-button' onClick={editHighlight}>Edit</button>
                    <button className='annotation-toolbar-button' onClick={cancel}>Cancel</button>
                </div>
            </div> :
            <div className='annotation' style={style}>
                <div className='annotation-toolbar'>
                    <button className='annotation-toolbar-button' onClick={addHighlight}>Add</button>
                    <button className='annotation-toolbar-button' onClick={editHighlight}>Edit</button>
                    <button className='annotation-toolbar-button' onClick={deleteHighlight}>Delete</button>
                    <button className='annotation-toolbar-button' onClick={cancel}>Cancel</button>
                </div>
                {highlightedText}
            </div>;
    }
}
