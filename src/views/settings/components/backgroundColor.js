import React, { PropTypes, Component } from 'react';
import { Modal, Button } from 'react-bootstrap/lib/';
import { CirclePicker } from 'react-color';

export default class BackgroundColor extends Component {

    static propTypes = {
        showColorModal: PropTypes.boolean,
        colorPicked: PropTypes.string,
        background: PropTypes.string,

        closeColorDialog: PropTypes.func.isRequired,
        openColorDialog: PropTypes.func.isRequired,
        handleOnSelectColor: PropTypes.func.isRequired,
        changeBackgroundColor: PropTypes.func.isRequired,

    };


    close = () => {
        const { closeColorDialog } = this.props;
        closeColorDialog(false);
    }

    open = () => {
        const { openColorDialog } = this.props;
        openColorDialog(true);
    }

    handleChangeComplete = (color, event) => {
        const { handleOnSelectColor } = this.props;
        handleOnSelectColor(color.hex);
    }

    changeColor = () => {
        const { changeBackgroundColor, colorPicked } = this.props;
        changeBackgroundColor(colorPicked);
        this.close();
    }

    render() {
        const { showColorModal } = this.props;
        return (
            <div>
                <Button
                    bsStyle='info'
                    onClick={this.open}
                >
                    Change Background
                </Button>

                <Modal show={showColorModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Select Your Color</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CirclePicker onChangeComplete={this.handleChangeComplete} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle='success' onClick={this.changeColor}>Save</Button>
                        <Button bsStyle='warning' onClick={this.close}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
