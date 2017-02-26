import React, { PropTypes, Component } from 'react';
import {
     Button, FormControl, FormGroup,
    Col, ControlLabel } from 'react-bootstrap/lib/';
import TagsInput from 'react-tagsinput';
import './upload.scss';


export default class Upload extends Component {

    static propTypes = {
        groups: PropTypes.arrayOf(Object),
        updateUploadFile: PropTypes.func.isRequired,
        submitFile: PropTypes.func.isRequired,
        fetchItemTypes: PropTypes.func.isRequired,
        setActiveItem: PropTypes.func.isRequired,
        fieldVisible: PropTypes.boolean,
        activeItem: PropTypes.string,
        title: PropTypes.string,
        author: PropTypes.string,
        handleTitleChange: PropTypes.func.isRequired,
        handleAuthorChange: PropTypes.func.isRequired,
        tags: PropTypes.arrayOf(String),
        handleTagsChange: PropTypes.func.isRequired,
    };

    componentWillMount() {
        const { fetchItemTypes } = this.props;
        fetchItemTypes();
    }

    handleSubmit = () => {
        const { submitFile } = this.props;
        submitFile();
    }

    handleFileChange = (file) => {
        const { updateUploadFile } = this.props;
        updateUploadFile(file);
    }

    handleOnItemSelect = (item) => {
        const { setActiveItem } = this.props;
        const itemID = item.target.value;
        setActiveItem(itemID);
    }

    handleTitleChange = (name) => {
        const { handleTitleChange } = this.props;
        handleTitleChange(name.target.value);
    }

    handleAuthorChange = (name) => {
        const { handleAuthorChange } = this.props;
        handleAuthorChange(name.target.value);
    }

    handleTagChange = (tag) => {
        const { handleTagsChange } = this.props;
        handleTagsChange(tag);
    }

    render() {
        const { groups, fieldVisible, activeItem, title, author, tags } = this.props;

        return (
            <div className='upload-content'>
                <div>
                    <h2 className='upload-title'>Upload New File</h2>
                    <div>
                        <div className='upload-file-upload'>
                            <ControlLabel>Choose A File*</ControlLabel>
                            <br />
                            <input type='file' accept='.pdf, .html' onChange={this.handleFileChange} />
                        </div>

                        <Col sm={5}>
                            <ControlLabel>Title*</ControlLabel>
                            <FormControl type='text' value={title} onChange={this.handleTitleChange} />
                        </Col>
                        <Col sm={7}>
                            <ControlLabel>Author*</ControlLabel>
                            <FormControl type='text' value={author} onChange={this.handleAuthorChange} />
                        </Col>
                        <br />
                        <Col sm={12}>
                            <ControlLabel>Item Type*</ControlLabel>
                            <FormGroup controlId='formControlsSelect'>
                                <FormControl componentClass='select' onChange={this.handleOnItemSelect}>
                                    {groups.map(op =>
                                        <option value={op.id}>{op.name}</option>
                                    )}
                                </FormControl>
                            </FormGroup>
                        </Col>
                        <br />
                        {fieldVisible ?
                            <div>
                                <Col sm={12}>
                                    <ControlLabel>Meta Data:</ControlLabel>
                                </Col>
                                {groups.filter(x => x.id === activeItem)[0].fields.map(obj =>
                                    <div>
                                        <Col sm={4}>
                                            <ControlLabel>{obj.name}</ControlLabel>
                                            <FormControl type='text' />
                                        </Col>
                                    </div>
                                )
                                }
                            </div> : null
                        }
                    </div>
                </div>

                <div>
                    <Col sm={12}>
                        <br />
                        <br />
                        <ControlLabel>Tags:</ControlLabel>
                        <TagsInput value={tags} onChange={this.handleTagChange} />
                        <br />
                        <br />
                        <Button onClick={this.handleSubmit}>Upload</Button>
                    </Col>
                </div>
            </div>
        );
    }
}
