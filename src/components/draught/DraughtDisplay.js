import React from 'react';
import CommonDraughtDataDisplay from './CommonDraughtDataDisplay';
import PlaceDisplay from './PlaceDisplay';
import AdditionalInfoDisplay from './AdditionalInfoDisplay';
import WeatherDisplay from './WeatherDisplay';

import { Redirect } from 'react-router-dom';

import { Row, Col, Button, Glyphicon } from 'react-bootstrap';

export default class DraughtDisplay extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			sure : false
		}

		this.clickRemove = this.clickRemove.bind(this);
		this.clickEdit = this.clickEdit.bind(this);
	}

	clickRemove() {
		if(!this.state.sure) {
			this.setState({
				sure : true
			});
		} else {
			this.setState({
				redirect : true,
				url : "/"
			})
		}
	}

	clickEdit() {
		this.setState({
			redirect : true,
			url : '/edit/' + this.props.draught.id
		});
	}

	render() {
		const draught = this.props.draught;

		const cancelText = this.state.sure ? "Oletko varma?" : "Poista";

		if(this.state.redirect) {
			return <Redirect to={this.state.url} />
		}

		return(
			<div className="dark-text xs-text-center">
				<CommonDraughtDataDisplay draught={draught}/>
				<PlaceDisplay place={draught.place} /> 
				<WeatherDisplay weather={draught.weather}/>
				<AdditionalInfoDisplay additionalAttributes={draught.additionalAttributes} />
		        <Row className="margin-top-30">
		            <Col xs={12} sm={3} smOffset={3}>
		              <Button bsSize="large" bsStyle="primary" className="btn-block" onClick={this.clickEdit}>
		                  Muokkaa 
		                  <Glyphicon className="spacy-glyph" glyph="edit" />
		              </Button>
		            </Col>
		            <Col xs={12} sm={3} className="col-sm-offset-right-3">
		              <Button bsSize="large" bsStyle="danger" className="btn-block pull-right" onClick={this.clickRemove}>
		                  {cancelText} 
		                  <Glyphicon className="spacy-glyph" glyph="remove" />
		              </Button>
		            </Col>
		        </Row>
			</div>				
		)
	}
}