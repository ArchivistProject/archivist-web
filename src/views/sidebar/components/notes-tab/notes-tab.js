import React, { PropTypes, Component } from 'react';
import './notes-tab.scss';

export default class NotesTab extends Component {

    static propTypes = {
        highlights: PropTypes.arrayOf(PropTypes.object),
        deleteHighlight: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            editId: '',
        };
    }

    handleEditClicked = (highlight) => {
        console.log(highlight);
    }

    renderHighlight(highlight) {
        const { deleteHighlight } = this.props;
        return (
            <div className='highlight' key={highlight.highlightId}>
                <span className='highlight-text'>{`"${highlight.text}"`}</span>
                <span className='highlight-note'>{highlight.note}</span>
                <button onClick={() => this.handleEditClicked(highlight)}>Edit</button>
                <button onClick={() => deleteHighlight(highlight)}>Delete</button>
            </div>
        );
    }

    render() {
        const { highlights } = this.props;
        console.log(highlights);
        return (
            <div className='notes-tab'>
                {highlights.map(highlight => this.renderHighlight(highlight))}
            </div>
        );
    }
}
