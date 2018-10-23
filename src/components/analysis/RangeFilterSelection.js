import React from 'react';
import { Grid, Row, Col, Glyphicon, ControlLabel, FormControl } from 'react-bootstrap';
import TitleBar from '../common/display/TitleBar.js';
import Slider from 'react-rangeslider';
// To include the default styles
import 'react-rangeslider/lib/index.css';

export default class RangeFilterSelection extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			min : props.min,
			max : props.max,
			minimumEV : props.min,
			maximumEV : props.max
		}

		this.filterSelections = this.filterSelections.bind(this);
		this.handleChangeStart = this.handleChangeStart.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleChangeComplete = this.handleChangeComplete.bind(this);
	}

	componentDidUpdate(prevProps) {
		let prevamount = 0;
		let newamount = 0;

		if(prevProps.filters[prevProps.selectedType]) {
			prevamount = prevProps.filters[prevProps.selectedType].length;
		}

		if(this.props.filters[this.props.selectedType]) {
			newamount = this.props.filters[this.props.selectedType].length;
		}

		if(this.props.type != this.props.selectedType && ( prevProps.selectedType != this.props.selectedType || prevamount != newamount)) {
			this.filterSelections();
		}
	}

	filterSelections() {
		let key = Object.keys(this.props.filteredData)[0];

		let foundEntries = {};

		const currentField = this.props.type;

		const fields = currentField.split(".");
		const values = [];

		this.props.filteredData.forEach((draught) => {
			let datavalue = draught;

			fields.forEach((field) => {
				datavalue = datavalue[field];
			});
				
			values.push(parseFloat(datavalue));
		});

		values.sort((a,b) => {
			return a-b;
		})

		this.setState({
			minimumEV : values[0],
			maximumEV : values[values.length - 1]
		})
	}

	handleChangeStart() {

	};

  	handleChange(type, value) {
  		const stateObject = {
  			
  		};

  		stateObject[type] = value;

  		if(type == 'min' && this.state.max < value) {
  			stateObject['max'] = value;
  		} else if(type == 'max' && this.state.min > value) {
  			stateObject['min'] = value;
  		}

    	this.setState(stateObject);
 	}


	handleChangeComplete () {
		this.props.handleSelect({ min : this.state.min, max : this.state.max }, this.props.type);
	}

	render() {

		return(
			<Grid>
				<Row>
					<Col xs={12} sm={12}>
						<h3 className="dark-text">
							{this.props.title} {this.state.min} - {this.state.max}
						</h3>
					    <Slider
					        min={this.state.minimumEV}
					        max={this.state.maximumEV}
					        step={0.1}
					        value={this.state.min}
					        onChangeStart={this.handleChangeStart}
					        onChange={(value) => { this.handleChange('min', value)}}
					        onChangeComplete={this.handleChangeComplete}
					    />
					    <Slider
					        min={this.state.minimumEV}
					        max={this.state.maximumEV}
					        step={0.1}
					        value={this.state.max}
					        onChangeStart={this.handleChangeStart}
					        onChange={(value) => { this.handleChange('max', value)}}
					        onChangeComplete={this.handleChangeComplete}
					    />
					</Col>
				</Row>
			</Grid>
		)
	}
}	