import React, { PropTypes, Component } from 'react';
import './notes-tab.scss';

export default class NotesTab extends Component {

    static propTypes = {
        highlights: PropTypes.arrayOf(PropTypes.object),
        deleteHighlight: PropTypes.func.isRequired,
        editHighlight: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            editId: '',
            note: '',
        };
    }

    handleEditClicked = (highlight) => {
        this.setState({
            editId: highlight.highlightId,
            note: highlight.note,
        });
    }

    handleNoteChanged = (e) => {
        this.setState({
            note: e.target.value,
        });
    }

    handleSaveClicked = (highlight) => {
        const { editHighlight } = this.props;
        const { note } = this.state;
        editHighlight(highlight, note);
        this.resetState();
    }

    resetState = () => {
        this.setState({
            editId: '',
            note: '',
        });
    }

    renderHighlight(highlight) {
        const { deleteHighlight } = this.props;
        const { editId, note } = this.state;
        return (
            <div className='highlight' key={highlight.highlightId}>
                <span className='highlight-text'>{`"${highlight.text}"`}</span>
                {editId === highlight.highlightId ?
                    <textarea className='highlight-textarea' onChange={this.handleNoteChanged} value={note} autoFocus={true} />
                    : <span className='highlight-note'>{highlight.note}</span>
                }
                {editId === highlight.highlightId ?
                    <div className='highlight-edit-buttons'>
                        <button onClick={() => this.handleSaveClicked(highlight)}>Save</button>
                        <button onClick={this.resetState}>Cancel</button>
                    </div>
                    : <button onClick={() => this.handleEditClicked(highlight)}>Edit</button>
                }
                <button type='danger' onClick={() => deleteHighlight(highlight)}>Delete</button>
            </div>
        );
    }

    render() {
        const { highlights } = this.props;
        return (
            <div className='notes-tab'>
                {highlights.map(highlight => this.renderHighlight(highlight))}
            </div>
        );
    }
}
