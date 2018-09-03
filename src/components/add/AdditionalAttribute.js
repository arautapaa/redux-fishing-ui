import React from 'react';
import { FormGroup, FormControl, ControlLabel, Col, Button, Glyphicon } from 'react-bootstrap';

export default class AdditionalAttribute extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return(
			<FormGroup>
				<Col xs={6}>
					<ControlLabel className="dark-text">Lisätiedon tyyppi</ControlLabel>
					<FormControl
			        	type="text"
			            value={this.props.name}
			            placeholder="Lisätiedon tyyppi"
			            onChange={(event) => this.props.onAttributeChange({
			            		index  : this.props.index,
			            		name   : event.target.value,
			            		value  : this.props.value
			            	})
			            }
			        />
		        </Col>
		        <Col xs={6}>
		        	<ControlLabel className="dark-text">Lisätiedon arvo</ControlLabel>
		        	<div className="input-group">

						<FormControl
				        	type="text"
				            value={this.props.value}
				            placeholder="Lisätiedon arvo"
				            onChange={(event) => this.props.onAttributeChange({
				            		index  : this.props.index,
				            		name   : this.props.name,
				            		value  : event.target.value
				            	})
				            }
				        />
				        <span className="input-group-btn">
					        <Button bsClass="btn btn-danger" onClick={() => this.props.removeAttribute(this.props.index)}>
			        			<Glyphicon glyph="remove" /> 
			      			</Button>
		      			</span>
	      			</div>
		        </Col>
			</FormGroup>
		);
	}
}