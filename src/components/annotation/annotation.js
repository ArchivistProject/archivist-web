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

    constructor(props) {
        super(props);
        this.state = {
            note: '',
            editMode: false,
        };
    }

    handleNoteChanged = (e) => {
        this.setState({
            note: e.target.value,
        });
    }

    toggleEditMode = () => {
        this.setState({
            editMode: !this.state.editMode,
        });
    }

    render() {
        const { highlightedText, selectedHighlights, selectionRect, selectedHighlightsRects, addHighlight, editHighlight, deleteHighlight, cancel } = this.props;
        const { note, editMode } = this.state;
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
        console.log(selectedHighlights);
        return selectedHighlights.length > 0 ?
            <div className='annotation' style={style}>
                <div className='annotation-toolbar'>
                    <button className='annotation-toolbar-button' onClick={deleteHighlight}>Delete</button>
                    <button className='annotation-toolbar-button' onClick={this.toggleEditMode}>Edit</button>
                    <button className='annotation-toolbar-button' onClick={cancel}>Cancel</button>
                </div>
                <div className='annotation-details'>
                    <span className='annotation-text-highlight'>{selectedHighlights[0].text}</span>
                    {editMode ? <input /> : <span className='annotation-text-note'>{selectedHighlights[0].note}</span>}
                </div>
            </div> :
            <div className='annotation' style={style}>
                <div className='annotation-toolbar'>
                    <button className='annotation-toolbar-button' onClick={() => addHighlight(note)}>Add</button>
                    <button className='annotation-toolbar-button' onClick={cancel}>Cancel</button>
                </div>
                <div className='annotation-details'>
                    <input className='annotation-input' onChange={this.handleNoteChanged} value={note} />
                    {highlightedText}
                </div>
            </div>;
    }
}
