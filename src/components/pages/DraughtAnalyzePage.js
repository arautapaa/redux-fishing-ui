import React from 'react';

import { Grid, Row, Col } from 'react-bootstrap';
import Header from '../common/Header';
import LoadingIndicator from '../common/LoadingIndicator';
import DraughtAnalyzer from '../../api/analyze';
import LineChartAnalysis from '../analysis/LineChartAnalysis';
import DraughtAPI from '../../api/draughts';
import FilterSelection from '../analysis/FilterSelection';
import SelectedFilters from '../analysis/SelectedFilters';
import DataTableDisplay from '../common/table/DataTableDisplay';

export default class DraughtAnalyzePage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading : true,
			analysis : {

			},
			selections : [],
			places : [],
			filters : [],
		}

		this.fields = {

		}

		this.rangeSort = this.rangeSort.bind(this);
		this.numberSort = this.numberSort.bind(this);
		this.directionSort = this.directionSort.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
		this.addFilter = this.addFilter.bind(this);
		this.removeFilters = this.removeFilters.bind(this);
	}

	rangeSort(a, b) {
		const aSplit = a.label.split("-")[0];
		const bSplit = b.label.split("-")[0];

		return parseInt(aSplit) - parseInt(bSplit);
	}

	numberSort(a, b) {
		return a.label - b.label;
	}

	directionSort(a, b) {
		const map = {
			"Pohjoinen" : 0,
			"Koillinen" : 45,
			"Itä" : 90,
			"Kaakko" : 135,
			"Etelä" : 180,
			"Lounas" : 225,
			"Länsi" : 270,
			"Luode" : 315
		}

		return map[a] - map[b];
	}

	componentDidMount() {
 		Promise.all([DraughtAnalyzer.getDraughtAnalysis(), DraughtAPI.getAllSelections()]).then((response) => {
 			this.setState({
 				loading : false,
 				filteredData : response[0],
 				analysis : response[0],
 				selections : response[1].selections,
 				places : response[1].places
 			})
 		})	
  	}

  	handleSelect(item, type) {
  		let analysisData = JSON.parse(JSON.stringify(this.state.analysis));

  		Object.keys(analysisData).forEach((typekey) => {
  			const rangekeys = Object.keys(analysisData[typekey]);

  			rangekeys.forEach((rangekey) => {
  				const draughts = analysisData[typekey][rangekey].filter((draught) => {
  					return draught[type] == item;
  				});

  				analysisData[typekey][rangekey] = draughts;
  			});
  		});

  		this.setState({
  			filteredData : analysisData
  		})
  	}

  	addFilter(filter) {
  		const filters = this.state.filters.slice();

  		filters.push(filter);

  		this.setState({
  			filters : filters
  		});
  	}

  	removeFilters() {
  		this.setState({
  			filters : []
  		})
  	}

  	handleHeaderClick() {

  	}

	render() {
		let component = <LoadingIndicator />
		let charts = null;

		if(this.state.filters.length > 0) {

			charts = <div>
				<SelectedFilters filters={this.state.filters} />
				<LineChartAnalysis 
					data={this.state.filters} 
					keyname="byTemp"
					sortHandler={this.rangeSort} 
					labelName="Kalojen määrä"
					headerName="Lämpötila" />
					<LineChartAnalysis 
					data={this.state.filters}
					keyname="weight"
					sortHandler={this.rangeSort}
					labelName="Kalojen määrä"
					headerName="Paino" />
					<LineChartAnalysis 
					data={this.state.filters}
					keyname="byMonth"
					sortHandler={this.numberSort}
					labelName="Kalojen määrä"
					headerName="Kuukausi" 
					labeltype="numeric"/>
					<LineChartAnalysis 
					data={this.state.filters}
					keyname="byTime"
					sortHandler={this.numberSort}
					labelName="Kalojen määrä"
					headerName="Tunti"
					labeltype="numeric" />
					<LineChartAnalysis 
					data={this.state.filters}
					keyname="windD"
					sortHandler={this.directionSort}
					labelName="Kalojen määrä"
					headerName="Tuulensuunta" 
					/>
			</div>
		}

		if(!this.state.loading) {
			component = <div>
				<FilterSelection selections={this.state.selections} places={this.state.places} analysis={this.state.analysis} addFilter={this.addFilter} removeFilters={this.removeFilters} />
				{charts}
			</div>
		}

		return(
			<div>
			    <Header {...this.props} />
			    <div className="btn-group">
			    </div>
				{component}
			</div>
		)
	}
}