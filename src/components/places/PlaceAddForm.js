import React from 'react';
import {FormGroup, ControlLabel, FormControl, Button, Glyphicon} from 'react-bootstrap'; 

export default class PlaceAddForm extends React.Component {

	constructor(props) {
		super(props);
	}


	render() {
		return(
			<FormGroup>
				<ControlLabel className="dark-text">
					Paikan nimi
				</ControlLabel>
				<div className="input-group">
					<FormControl onChange={(event) => this.props.onInputChange('name', event.target.value)}/>
					<span className="input-group-btn">
					    <Button bsStyle="primary" onClick={() => this.props.savePlace()}>
			        		<Glyphicon glyph="save" /> 
			      		</Button>
		      		</span>
				</div>
			</FormGroup>
		)
	}
}