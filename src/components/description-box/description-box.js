import React, { PropTypes, Component } from 'react';
import { canEditDescription } from '~/src/state/user/privileges';
import marked from 'marked';
//import './description-box.scss';

export default class DescriptionBox extends Component {

    static propTypes = {
        activeItem: PropTypes.object.isRequired,
        activeItemEditing: PropTypes.object.isRequired,
        updateDescription: PropTypes.func.isRequired,
        saveDescription: PropTypes.func.isRequired,
        editMode: PropTypes.bool.isRequired,
        toggleEditMode: PropTypes.func.isRequired,
    };

    handleDescriptionUpdated = (e) => {
        const { updateDescription } = this.props;
        console.log(e.target.value);
        updateDescription(e.target.value);
    }

    handleEditModeToggled = (save) => {
        const { toggleEditMode, saveDescription } = this.props;
        if (save) {
            saveDescription();
        }
        toggleEditMode();
    }

    getMarkdownText() {
      const { activeItem } = this.props;
      console.log('NORM DESC: ' + activeItem.description);
      var desc = activeItem.description === undefined ? '' : activeItem.description;
      var rawMarkup = marked(desc, {sanitize: true});
      console.log("RAW MARKUP: " + rawMarkup);
      return { __html: rawMarkup };
    }

    renderDescriptionBox() {
      const { activeItemEditing, editMode} = this.props;
      if (editMode) {
        console.log('EDIT DESC: ' + activeItemEditing.description);
        var desc = activeItemEditing.description === undefined ? '' : activeItemEditing.description;
        return (<textarea className='summary-tab-description-input' value={desc} onChange={this.handleDescriptionUpdated} />);
      }
      return (<div dangerouslySetInnerHTML={this.getMarkdownText()} />);
    }

    renderEditControls() {
        const { editMode } = this.props;
        if (editMode) {
            return (
                <div className='summary-tab-metadata-controls'>
                    <button className='summary-tab-edit' onClick={() => this.handleEditModeToggled(true)}>SAVE</button>
                    <button className='summary-tab-cancel' onClick={() => this.handleEditModeToggled(false)}>CANCEL</button>
                </div>
            );
        }
        return (
            <div className='summary-tab-metadata-controls'>
                <button className='summary-tab-edit' onClick={() => this.handleEditModeToggled(false)}>EDIT DESCRIPTION</button>
            </div>
        );
    }

    render() {
        return (
          <section className='summary-tab-description'>
              <span className='summary-tab-category'>Description</span>
              { this.renderDescriptionBox() }
              { canEditDescription ? this.renderEditControls() : null }
          </section>
        );
    }
}
