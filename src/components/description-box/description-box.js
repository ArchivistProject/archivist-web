import React, { PropTypes, Component } from 'react';
import { canEditDescription } from '~/src/state/user/privileges';
import marked from 'marked';
import './description-box.scss';

export default class DescriptionBox extends Component {

    static propTypes = {
        activeItem: PropTypes.object.isRequired,
        activeItemEditing: PropTypes.object.isRequired,
        updateDescription: PropTypes.func.isRequired,
        saveDescription: PropTypes.func.isRequired,
        toggleDescriptionEditMode: PropTypes.func.isRequired,
        descriptionEditMode: PropTypes.bool.isRequired,
    };

    getMarkdownText() {
        const { activeItem } = this.props;
        const desc = activeItem.description === undefined ? '' : activeItem.description;
        const rawMarkup = marked(desc, { gfm: true, sanitize: true, breaks: true });
        return { __html: rawMarkup };
    }

    handleDescriptionUpdated = (e) => {
        const { updateDescription } = this.props;
        updateDescription(e.target.value);
    }

    handleEditModeToggled = (save) => {
        const { toggleDescriptionEditMode, saveDescription } = this.props;
        if (save) {
            saveDescription();
        }
        toggleDescriptionEditMode();
    }

    renderDescriptionBox() {
        const { activeItemEditing, descriptionEditMode } = this.props;
        if (descriptionEditMode) {
            const desc = activeItemEditing.description === undefined ? '' : activeItemEditing.description;
            console.log('EDIT DESC:', activeItemEditing.description);
            return (<textarea className='description-box-input' value={desc} onChange={this.handleDescriptionUpdated} />);
        }
        return (<div className='description-box-markdown' dangerouslySetInnerHTML={this.getMarkdownText()} />);
    }

    renderEditControls() {
        const { descriptionEditMode } = this.props;
        if (descriptionEditMode) {
            return (
                <div className='description-box-controls'>
                    <button type='small' onClick={() => this.handleEditModeToggled(true)}>Save</button>
                    <button type='small' onClick={() => this.handleEditModeToggled(false)}>Cancel</button>
                </div>
            );
        }
        return (
            <div className='description-box-controls'>
                <button type='small' onClick={() => this.handleEditModeToggled(false)}>Edit Description</button>
            </div>
        );
    }

    render() {
        return (
            <section className='description-box'>
                { this.renderDescriptionBox() }
                { canEditDescription ? this.renderEditControls() : null }
            </section>
        );
    }
}
