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
		const headers = {
			fish : "Kala",
			gear : "Väline",
			fisher : "Kalastaja"
		}
		const { show, close } = this.props;

		return(
	      <Modal show={show}>
	        <Modal.Header>
	          <Modal.Title className="dark-text">
	            Lisää tieto tyypille: {headers[this.props.type]}
	          </Modal.Title>
	        </Modal.Header>
	        <Modal.Body>
	      		<input type="text" className="form-control" onChange={(event) => this.setState({ value : event.target.value })} />
	        </Modal.Body>
	        <Modal.Footer>
	          <Button bsStyle="default" className="dark-text" onClick={() => this.props.closeWithoutSaving()}>Sulje</Button>
	          <Button bsStyle="primary" onClick={this.onClose}>Tallenna</Button>
	        </Modal.Footer>
	      </Modal>
		)
	}
}