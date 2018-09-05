import React from 'react';
import { Modal, Button } from "react-bootstrap";

export default class CommonSelectionModal extends React.Component {

	constructor(props) {
		super(props);
		
		this.state = {
			value : ""
		}

		this.onClose = this.onClose.bind(this);
	}

	onClose() {
		this.props.close(this.props.type, this.state.value);
	}

	render() {
		const { show, close } = this.props;

		return(
	      <Modal show={show}>
	        <Modal.Header>
	          <Modal.Title className="dark-text">
	            Lisää tieto tyypille {this.props.type}
	          </Modal.Title>
	        </Modal.Header>
	        <Modal.Body>
	      		<input type="text" className="form-control" onChange={(event) => this.setState({ value : event.target.value })} />
	        </Modal.Body>
	        <Modal.Footer>
	          <Button bsStyle="default" onClick={this.onClose}>Close</Button>
	        </Modal.Footer>
	      </Modal>
		)
	}
}