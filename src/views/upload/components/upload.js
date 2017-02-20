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
        handleTitleChange: PropTypes.func.isRequired,
        handleAuthorChange: PropTypes.func.isRequired,
        tags: PropTypes.arrayOf(String),
        handleTagsChange: PropTypes.func.isRequired,
        allItemID: PropTypes.arrayOf(String),
        filePicked: PropTypes.boolean,
        setFieldVisible: PropTypes.func.isRequired,

        // holds all values from meta data text fields
        allMetaDataValue: PropTypes.arrayOf(Object),
        setAllMetaData: PropTypes.func.isRequired,
    };

    componentWillMount() {
        const { fetchItemTypes } = this.props;
        fetchItemTypes();
    }

    handleSubmit = () => {
        const { submitFile, tags, allMetaDataValue, filePicked, setAllItemID, setFieldVisible, handleTagsChange } = this.props;
        let metaDataArray;
        if (allMetaDataValue !== undefined) {
            metaDataArray = allMetaDataValue.slice();
        } else {
            metaDataArray = [];
        }
        if (filePicked === false) {
            alert('Please click browse to select a file to upload');
        } else if (metaDataArray.length <= 0) {
            alert('Please pick a category and enter some meta data for this file before uploading');
        } else {
            for (let i = 0; i < metaDataArray.length; i += 1) {
                console.log(metaDataArray[i].data);
            }
            submitFile(tags, allMetaDataValue);
            // this will uncheck all the category boxes
            const allItemID = [];
            setAllItemID(allItemID);
            setFieldVisible(false);
            // clear tags box
            const allTags = [];
            handleTagsChange(allTags);
        }
    }

    handleFileChange = () => {
        const { updateUploadFile } = this.props;
        const file = this.fileUpload.files[0];
        updateUploadFile(file);
    }
    handleOnItemSelect = (obj) => {
        const { groups, allItemID, setAllItemID, setAllMetaData, allMetaDataValue } = this.props;
        const itemID = obj.target.value;
        const checked = obj.target.checked;

        let array = allItemID.slice();

        // if checked then add to array
        if (checked === true) {
            array = array.concat(itemID);
        } else {
            // if unchecked then remove from array
            let index;
            // find the index
            for (let i = 0; i < array.length; i += 1) {
                if (array[i] === itemID) {
                    index = i;
                    break;
                }
            }
            // remove element so the meta data fields don't show
            array.splice(index, 1);
            // look for the group name
            let name = null;
            const metaDataArray = allMetaDataValue.slice();
            for (let i = 0; i < groups.length; i += 1) {
                if (groups[i].id === itemID) {
                    name = groups[i].name;
                    console.log(`group name to remove: ${name}`);
                    break;
                }
            }
            // remove meta data fields from meta data array if user uncheck a category using the group name
            console.log(`length: ${metaDataArray.length}`);
            for (let i = 0; i < metaDataArray.length; i += 1) {
                console.log(`before array val: ${metaDataArray[i].name}`);
            }
            index = metaDataArray.length;
            while (index > 0) {
                index -= 1;
                if (metaDataArray[index].group === name) {
                    console.log(`removing ${metaDataArray[index].group}`);
                    metaDataArray.splice(index, 1);
                }
            }
            console.log(`length after: ${metaDataArray.length}`);
            for (let i = 0; i < metaDataArray.length; i += 1) {
                console.log(`After array val: ${metaDataArray[i].name}`);
            }
            setAllMetaData(metaDataArray);
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
        const { groups, allMetaDataValue, setAllMetaData } = this.props;
        const theData = obj.target.value;
        const theType = obj.target.getAttribute('data-type');
        const theName = obj.target.name;
        const id = obj.target.id;
        let theGroup = null;

        console.log(`name: ${theName}`);
        console.log(`type: ${theType}`);
        console.log(`data: ${theData}`);
        console.log(`id: ${id}`);

        // use the id to find the group name
        for (let i = 0; i < groups.length; i += 1) {
            if (groups[i].id === id) {
                theGroup = groups[i].name;
                break;
            }
        }

        console.log(`group: ${theGroup}`);

        const object = {
            name: theName,
            type: theType,
            data: theData,
            group: theGroup,
        };

        let array = allMetaDataValue.slice();
        // check if item already exist in the array in case user went back and change the value in the text box
        for (let i = 0; i < array.length; i += 1) {
            if (array[i].name === theName) {
                // if found then remove the old one
                array.splice(i, 1);
            }
        }
        array = array.concat(object);
        setAllMetaData(array);
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
                            <input type='file' accept='.pdf, .html' ref={(ref) => { this.fileUpload = ref; }} onChange={this.handleFileChange} />
                        </div>
                        <br />
                        <br />
                        <Col sm={12}>
                            <ControlLabel>Categories*:</ControlLabel>
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
                                    <ControlLabel>Meta Data Fields*:</ControlLabel>
                                </Col>
                                {allItemID.map(ID =>
                                    <div>
                                        {groups.filter(x => x.id === ID)[0].fields.map(obj =>
                                            <div>
                                                <Col sm={3}>
                                                    <ControlLabel>{obj.name}</ControlLabel>
                                                    <FormControl name={obj.name} id={ID} data-type={obj.type} onBlur={this.handleMetaDataTextChange} type='text' />
                                                </Col>
                                            </div>
                                    )
                                    }
                                    </div>
                                )}
                            </div>
                            : null
                        }

                        <div>
                            <Col sm={12}>
                                <br />
                                <br />
                                <ControlLabel>Tags:</ControlLabel>
                                <TagsInput value={tags} onChange={this.handleTagChange} />
                            </Col>
                        </div>

                        <Col sm={12}>
                            <Button className='upload-submit-btn' onClick={this.handleSubmit}>Upload</Button>
                        </Col>
                    </div>
                </div>
            </div>
        );
    }
}
