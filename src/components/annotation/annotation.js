import React, { PropTypes, Component } from 'react';
import './annotation.scss';

export default class Annotation extends Component {

    static propTypes = {
        selectionRect: PropTypes.object,
        selectedHighlightRect: PropTypes.object,
        selectedHighlight: PropTypes.object,
        addHighlight: PropTypes.func.isRequired,
        editHighlight: PropTypes.func.isRequired,
        deleteHighlight: PropTypes.func.isRequired,
        cancel: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        const { selectedHighlight } = props;
        this.state = {
            note: selectedHighlight ? selectedHighlight.note : '',
            editMode: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        const { selectedHighlight } = nextProps;
        if (selectedHighlight) {
            this.setState({
                note: selectedHighlight.note,
            });
        }
    }

    handleHighlightAdded = () => {
        const { addHighlight } = this.props;
        const { note } = this.state;
        addHighlight(note);
        this.setState({
            note: '',
        });
    }

    handleNoteChanged = (e) => {
        this.setState({
            note: e.target.value,
        });
    }

    handleNoteSaved = () => {
        const { editHighlight } = this.props;
        const { note } = this.state;
        editHighlight(note);
        this.toggleEditMode(false);
    }

    toggleEditMode = (resetNote) => {
        const { selectedHighlight } = this.props;
        this.setState({
            editMode: !this.state.editMode,
            note: resetNote ? selectedHighlight.note : this.state.note,
        });
    }

    render() {
        const { selectedHighlight, selectionRect, selectedHighlightRect, deleteHighlight, cancel } = this.props;
        const { note, editMode } = this.state;
        const annotationWidth = 200; // width of popup

        let style = {};
        const rect = selectionRect || selectedHighlightRect;
        console.log(selectionRect, selectedHighlightRect, rect);
        if (rect) {
            let left = (rect.left + ((rect.width) / 2)) - (annotationWidth / 2);
            left = left < 0 ? 10 : left;
            style = {
                top: rect.top + 20,
                left,
            };
        }
        console.log(style);
        return selectedHighlight ?
            <div className='annotation' style={style}>
                <div className='annotation-toolbar'>
                    {editMode ? <button className='annotation-toolbar-button' onClick={this.handleNoteSaved}>Save</button> : null}
                    <button className='annotation-toolbar-button' onClick={() => this.toggleEditMode(true)}>{editMode ? 'Cancel' : 'Edit'}</button>
                    <button className='annotation-toolbar-button' onClick={deleteHighlight}>Delete</button>
                </div>
                <div className='annotation-details'>
                    {editMode ? <input value={note} onChange={this.handleNoteChanged} /> : <span className='annotation-text-note'>{note}</span>}
                </div>
            </div> :
            <div className='annotation' style={style}>
                <div className='annotation-toolbar'>
                    <button className='annotation-toolbar-button' onClick={this.handleHighlightAdded}>Add</button>
                    <button className='annotation-toolbar-button' onClick={cancel}>Cancel</button>
                </div>
                <div className='annotation-details'>
                    <input className='annotation-input' onChange={this.handleNoteChanged} value={note} />
                </div>
            </div>;
    }
}
