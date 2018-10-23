import React from 'react';
import { Row, Col, Glyphicon } from 'react-bootstrap';
import TitleBar from '../common/display/TitleBar.js';


export default class CommonFilterSelection extends React.Component {

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
		let update = false;

		if(prevProps.filters[prevProps.selectedType]) {
			prevamount = prevProps.filters[prevProps.selectedType].length;
		}

		if(this.props.filters[this.props.selectedType]) {
			newamount = this.props.filters[this.props.selectedType].length;
		}

		if(prevProps.filters[prevProps.selectedType] != this.props.filters[this.props.selectedType]) {
			update = true;
		}

		if(update || this.props.selectedType == null && prevProps.selectedType != null || (this.props.type != this.props.selectedType && ( prevProps.selectedType != this.props.selectedType || prevamount != newamount))) {

			this.setState({
				foundEntries : this.filterSelections()
			});
		}
	}

	filterSelections() {
		let foundEntries = {};

		this.props.filteredData.forEach((draught) => {
			const value = draught[this.props.type];
			if(!foundEntries[value]) {
				foundEntries[value] = 0;
			}

			foundEntries[value] = foundEntries[value] + 1; 
		});


		return foundEntries;
	}



	render() {

		if(!this.props.filteredData) {
			return <Row><Col xs={6}>ASD</Col></Row>
		}


		const buttons = Object.keys(this.state.foundEntries).map((item, index) => {
			let className = "btn btn-primary";

			const usedFilters = this.props.filters[this.props.type];

			if(usedFilters) {
				usedFilters.forEach((filter) => {
					if(item == filter) {
						className = "btn selected-active";
					}
				})
			}

			const howMany = this.state.foundEntries[item];
			return <button key={index} className={className} onClick={() => {this.props.handleSelect(item, this.props.type)}}>{item} ({howMany})</button>
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