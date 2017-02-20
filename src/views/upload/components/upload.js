import React, { PropTypes, Component } from 'react';
import { Button, FormControl, Col, ControlLabel, Checkbox,
} from 'react-bootstrap/lib/';
import TagsInput from 'react-tagsinput';
import './upload.scss';


export default class Upload extends Component {

    static propTypes = {
        groups: PropTypes.arrayOf(Object),
        updateUploadFile: PropTypes.func.isRequired,
        submitFile: PropTypes.func.isRequired,
        fetchItemTypes: PropTypes.func.isRequired,
        setAllItemID: PropTypes.func.isRequired,
        fieldVisible: PropTypes.boolean,
        activeItem: PropTypes.string,
        handleTitleChange: PropTypes.func.isRequired,
        handleAuthorChange: PropTypes.func.isRequired,
        tags: PropTypes.arrayOf(String),
        handleTagsChange: PropTypes.func.isRequired,
        allItemID: PropTypes.arrayOf(String),

        // holds all values from meta data text fields
        allMetaDataValue: PropTypes.arrayOf(Object),
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
    handleOnItemSelect = (obj) => {
        const { allItemID, setAllItemID } = this.props;
        const itemID = obj.target.value;
        const checked = obj.target.checked;

        let array = allItemID.slice();

        // if checked then add to array
        if (checked === true) {
            let found = false;

            // if id already in the array then don't add
            for (let i = 0; i < array.length; i += 1) {
                if (array[i] === itemID) {
                    found = true;
                }
            }

            if (found === false) { array = array.concat(itemID); } else { console.log('already exist...'); }
        } else {
            // if unchecked then remove from array
            let index;
            // find the index
            for (let i = 0; i < array.length; i += 1) {
                if (array[i] === itemID) {
                    index = i;
                }
            }
            // remove element
            array.splice(index, 1);
        }

        // set the state to the new array
        setAllItemID(array);
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

    handleMetaDataTextChange = (obj) => {
        const { allMetaDataValue } = this.props;
        const val = obj.target.value;
        const id = obj.target.id;

        console.log(`Text val: ${val}`);
        console.log(`Text id: ${id}`);

        const array = allMetaDataValue.slice();
    }


    render() {
        const { groups, fieldVisible, tags, allItemID } = this.props;

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

                        <div>
                            <Col sm={12}>
                                <br />
                                <br />
                                <ControlLabel>Tags:</ControlLabel>
                                <TagsInput value={tags} onChange={this.handleTagChange} />
                                <br />
                                <br />
                            </Col>
                        </div>


                        <Col sm={12}>
                            <ControlLabel>Item Types:</ControlLabel>
                        </Col>
                        <div>
                            {groups.map(op =>
                                <Col sm={2}>
                                    <Checkbox
                                        value={op.id}
                                        onChange={this.handleOnItemSelect}
                                    >{op.name}</Checkbox>
                                </Col>
                            )}
                        </div>

                        {fieldVisible ?
                            <div>
                                <Col sm={12}>
                                    <ControlLabel>Meta Data:</ControlLabel>
                                </Col>
                                {allItemID.map(ID =>
                                    <div>
                                        {groups.filter(x => x.id === ID)[0].fields.map(obj =>
                                            <div>
                                                <Col sm={3}>
                                                    <ControlLabel>{obj.name}</ControlLabel>
                                                    <FormControl id={obj.id} onChange={this.handleMetaDataTextChange} type='text' />
                                                </Col>
                                            </div>
                                    )
                                    }
                                    </div>
                                )}
                            </div>
                            : null
                        }

                        <Col sm={12}>
                            <Button className='upload-submit-btn' onClick={this.handleSubmit}>Upload</Button>
                        </Col>
                    </div>
                </div>
            </div>
        );
    }
}
