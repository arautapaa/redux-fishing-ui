import React from 'react';
import { Row, Col, Glyphicon } from 'react-bootstrap';
import TitleBar from '../common/display/TitleBar.js';


export default class PlaceFilterSelection extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			filteredData : props.filteredData,

			foundEntries : this.filterSelections()
		}

		this.filterSelections = this.filterSelections.bind(this);
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

			this.setState({
				foundEntries : this.filterSelections()
			});
		}
	}

	filterSelections() {
		let key = Object.keys(this.props.filteredData)[0];

		let foundEntries = {};

		Object.keys(this.props.filteredData[key]).forEach((draughtKey) => {
			this.props.filteredData[key][draughtKey].forEach((draught) => {
				const value = draught[this.props.type];
				if(!foundEntries[value]) {
					foundEntries[value] = 0;
				}

				foundEntries[value] = foundEntries[value] + 1; 
			});
		});

		return foundEntries;
	}



	render() {

		if(!this.props.filteredData) {
			return <Row><Col xs={6}>ASD</Col></Row>
		}


		const buttons = Object.keys(this.state.foundEntries).map((item, index) => {
			let className = "btn btn-primary";

			const howMany = this.state.foundEntries[item];

			const places = this.props.items.filter((place) => {
				return item == place.id
			});

			const usedFilters = this.props.filters[this.props.type];

			if(usedFilters) {
				usedFilters.forEach((filter) => {
					if(item == filter) {
						className = "btn selected-active";
					}
				})
			}

			return <button key={index} className={className} onClick={() => {this.props.handleSelect(item, this.props.type)}}>{places[0].name} ({howMany})</button>
		});

		return(
			<Row>
				<Col xs={12} sm={12}>
					<TitleBar title={this.props.title}>
					</TitleBar>
					<Col smOffset={3} sm={6}>
						<div className="btn-group special">
							{buttons}
						</div>
					</Col>
				</Col>
			</Row>
		)
	}
}	