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
			selections : [],
			places : [],
			filters : [],
		}

		this.fields = {

		}

		this.addFilter = this.addFilter.bind(this);
		this.filter = this.filter.bind(this);
		this.removeFilters = this.removeFilters.bind(this);
		this.modifyFilter = this.modifyFilter.bind(this);
		this.parseFloat = this.parseFloat.bind(this);
		this.parseMonth = this.parseMonth.bind(this);
	}

	parseMonth(value) {
		const date = new Date(value);

		return date.getMonth() + 1;
	}

	parseFloat(value) {
		return parseFloat(value);
	}

	componentDidMount() {
 		Promise.all([DraughtAPI.getAllDraughts(), DraughtAPI.getAllSelections()]).then((response) => {
 			this.setState({
 				loading : false,
 				filteredData : response[0],
 				draughts : response[0],
 				selections : response[1].selections,
 				places : response[1].places
 			})
 		})	
  	}
  	addFilter(filter) {
  		const filters = this.state.filters.slice();

  		this.filter(filter.selectedFilters).then((filteredData) => {
  			filter.filteredData = filteredData;
  			filters.push(filter);

  			this.setState({
	  			filters : filters
	  		});
  		}) 
  		
  	}

  	filter(filters) {
  		return new Promise((resolve) => {
  			let draughts = this.state.draughts.slice();

  			const filteredDraughts = draughts.filter((draught) => {
 				if(Object.keys(filters).length == 0) {
  					return true;
  				}

  				let found = true;

  				Object.keys(filters).forEach((filterkey) => {
  					const filtervalues = filters[filterkey];
  					
            		let datavalue = draught;

           			const filterkeyfields = filterkey.split(".");

            		filterkeyfields.forEach((field) => {
              			datavalue = datavalue[field];
            		});

            		let valuefound = false;

  					filtervalues.forEach((filtervalue) => {
              			if(typeof filtervalue == 'object') {
               				if(filtervalue.min < datavalue && filtervalue.max > datavalue) {
                  				valuefound = true;
                			}
              			} else if(filtervalue == datavalue) {
  						  	valuefound = true;
  						}
  					});

  					if(!valuefound) {
  						found = false;
  					}
  				});

  				return found;
  			});

  			resolve(filteredDraughts);
  		});
  	}


  	removeFilters() {
  		this.setState({
  			filters : []
  		})
  	}

  	handleHeaderClick() {

  	}

  	modifyFilter(filter) {
  		const filters = this.state.filters.slice();

  		let selectedFilters = filters[filter.index].selectedFilters;
  		selectedFilters[filter.type] = [];
  		selectedFilters[filter.type].push(filter.values);
  		
  		this.filter(selectedFilters).then((filteredData) => {
  			filters[filter.index].filteredData = filteredData;

  			this.setState({
  				filters : filters
  			}) 
  		});
  	}

	render() {
		let component = <LoadingIndicator />
		let charts = null;

		if(this.state.filters.length > 0) {

			charts = <div>
				<SelectedFilters filters={this.state.filters} />
				<LineChartAnalysis 
					data={this.state.filters} 
					keyname="weather.temperature"
					labelName="Kalojen määrä"
					parse={this.parseFloat}
					range={5}
					offset={0.1}
					headerName="Lämpötila" 
					modifyFilter={this.modifyFilter}/>
				<LineChartAnalysis 
					data={this.state.filters} 
					keyname="weight"
					sortHandler={this.rangeSort} 
					labelName="Kalojen määrä"
					parse={this.parseFloat}
					range={250}
					offset={0.1}
					headerName="Paino"
					modifyFilter={this.modifyFilter} />
				<LineChartAnalysis 
					data={this.state.filters} 
					keyname="weather.winddirection"
					sortHandler={this.rangeSort} 
					labelName="Kalojen määrä"
					parse={this.parseFloat}
					range={15}
					offset={0.1}
					headerName="Tuulensuunta"
					modifyFilter={this.modifyFilter} />
				<LineChartAnalysis 
					data={this.state.filters} 
					keyname="catchTime"
					parse={this.parseMonth}
					labelName="Kalojen määrä"
					range={1}
					headerName="Kuukausi"
					modifyFilter={this.modifyFilter} />
				<LineChartAnalysis 
					data={this.state.filters} 
					keyname="weather.pressure"
					parse={this.parseFloat}
					labelName="Kalojen määrä"
					range={5}
					offset={0.1}
					headerName="Ilmanpaine"
					modifyFilter={this.modifyFilter} />
				<LineChartAnalysis 
					data={this.state.filters} 
					keyname="weather.windspeed"
					parse={this.parseFloat}
					labelName="Kalojen määrä"
					range={2}
					offset={0.1}
					headerName="Tuulen nopeus"
					modifyFilter={this.modifyFilter} />
			</div>
		}

		if(!this.state.loading) {
			component = <div>
				<FilterSelection selections={this.state.selections} places={this.state.places} draughts={this.state.draughts} addFilter={this.addFilter} removeFilters={this.removeFilters} />
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