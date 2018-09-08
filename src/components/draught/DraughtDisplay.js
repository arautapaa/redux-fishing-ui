import React from 'react';
import CommonDraughtDataDisplay from './CommonDraughtDataDisplay';
import PlaceDisplay from './PlaceDisplay';
import AdditionalInfoDisplay from './AdditionalInfoDisplay';
import WeatherDisplay from './WeatherDisplay';

import { Redirect, Link } from 'react-router-dom';

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
			this.props.delete(this.props.draught.id);
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
			<div className="dark-text force-text-center">
				<Row>
					<Col xs={12} sm={6} smOffset={3} md={4} mdOffset={4} lg={2} lgOffset={5}>
						<Link to="/"><Button bsStyle="primary" bsSize="large">Takaisin</Button></Link>
						<CommonDraughtDataDisplay draught={draught}/>
						<PlaceDisplay place={draught.place} /> 
						<WeatherDisplay weather={draught.weather}/>
						<AdditionalInfoDisplay additionalAttributes={draught.additionalAttributes} />
		        	</Col>
		        </Row>
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