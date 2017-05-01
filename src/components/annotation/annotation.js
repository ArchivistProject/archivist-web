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
        const { editMode } = this.state;
        if (!editMode && selectedHighlight) {
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
        this.toggleEditMode();
    }

    handleCancelClicked = () => {
        const { selectedHighlight } = this.props;
        this.setState({
            note: selectedHighlight.note,
        }, this.toggleEditMode());
    }

    toggleEditMode = () => {
        this.setState({
            editMode: !this.state.editMode,
        });
    }

    render() {
        const { selectedHighlight, selectionRect, selectedHighlightRect, deleteHighlight } = this.props;
        const { note, editMode } = this.state;
        const annotationWidth = 200; // width of popup

        let style = {};
        const rect = selectionRect || selectedHighlightRect;

        if (rect) {
            let left = (rect.left + ((rect.width) / 2)) - (annotationWidth / 2);
            left = left < 0 ? 10 : left;
            style = {
                top: rect.top + 20,
                left,
            };
        }

        return selectedHighlight ?
            <div className='annotation' style={style}>
                <div className='annotation-toolbar'>
                    {!editMode ? <button className='annotation-toolbar-button' onClick={this.toggleEditMode}>Edit</button> : null}
                    {!editMode ? <button className='annotation-toolbar-button' onClick={deleteHighlight}>Delete</button> : null}
                    {editMode ? <button className='annotation-toolbar-button save-button' onClick={this.handleNoteSaved}>Save</button> : null}
                    {editMode ? <button className='annotation-toolbar-button' onClick={this.handleCancelClicked}>Cancel</button> : null}
                </div>
                <div className='annotation-details'>
                    {editMode ? <textarea className='annotation-textarea' onChange={this.handleNoteChanged} value={note} autoFocus={true} /> : <span className='annotation-text-note'>{note}</span>}
                </div>
            </div> :
            <div className='annotation' style={style}>
                <div className='annotation-toolbar'>
                    <button className='annotation-toolbar-button add-button' onClick={this.handleHighlightAdded}>Add</button>
                </div>
                <div className='annotation-details'>
                    <textarea className='annotation-textarea' onChange={this.handleNoteChanged} value={note} autoFocus={true} />
                </div>
            </div>;
    }
}
