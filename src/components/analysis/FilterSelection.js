import React from 'react';
import CommonFilterSelection from './CommonFilterSelection';
import PlaceFilterSelection from './PlaceFilterSelection';
import { Grid, Row, Col } from 'react-bootstrap';

export default class FilterSelection extends React.Component {
	constructor(props) {
		super(props);


		this.state = {
			selectedFilters : {},
			selectedType : null,
			filteredData : props.analysis,
			datasets : [],
      showFilters : true
		}

		this.handleSelect = this.handleSelect.bind(this);
		this.addFilter = this.addFilter.bind(this);
    this.removeFilters = this.removeFilters.bind(this);

	}

	handleSelect(item, type) {
  		let selectedFilters = JSON.parse(JSON.stringify(this.state.selectedFilters));

  		if(!selectedFilters[type]) {
  			selectedFilters[type] = [];
  		}

  		selectedFilters[type].push(item)

  		this.filter(selectedFilters).then((filteredData) => {
  			this.setState({
  				selectedFilters : selectedFilters,
  				selectedType : type,
  				filteredData : filteredData
  			});
  		})
  	}

  	filter(filters) {
  		return new Promise((resolve) => {
  			let data = JSON.parse(JSON.stringify(this.props.analysis));

  			Object.keys(data).forEach((typekey) => {
  				const rangekeys = Object.keys(data[typekey]).forEach((rangekey) => {
  					const draughts = data[typekey][rangekey];

  					const filteredDraughts = draughts.filter((draught) => {
 						if(Object.keys(filters).length == 0) {
  							return true;
  						}

  						let found = true;

  						Object.keys(filters).forEach((filterkey) => {
  							const filtervalues = filters[filterkey];
  							let valuefound = false;

  							filtervalues.forEach((filtervalue) => {
  								if(filtervalue == draught[filterkey]) {
  									valuefound = true;
  								}
  							});

  							if(!valuefound) {
  								found = false;
  							}
  						});

  						return found;
  					});

  					data[typekey][rangekey] = filteredDraughts;
  				})
  			});

  			resolve(data);
  		})
  	}

  	addFilter() {
      if(this.state.showFilters) {
    		const datasets = this.state.datasets.slice();

    		this.props.addFilter({
    			selectedFilters : this.state.selectedFilters,
    			filteredData : this.state.filteredData
    		});

    		this.setState({
    			datasets : datasets,
    			filteredData : this.props.analysis,
    			selectedType : null,
    			selectedFilters : {},
          showFilters : false
    		});
      } else {
        this.setState({
          showFilters : true
        })
      }
  	}

    removeFilters() {
      this.setState({
        datasets : [],
        filteredData : this.props.analysis,
        selectedType : null,
        selectedFilters : {},
        showFilters : true
      }, () => {
        this.props.removeFilters();
      })
      
    }

	render() {
    let filterSelections = null;
    let chooseFilterText = "Lisää uusi suodatus";

    if(this.state.showFilters) {
      filterSelections = <div>
          <CommonFilterSelection type="fish" handleSelect={this.handleSelect}  title="KALA" items={this.props.selections.fish} filteredData={this.state.filteredData} filters={this.state.selectedFilters} selectedType={this.state.selectedType}/>
          <CommonFilterSelection type="fisher" handleSelect={this.handleSelect}  title="KALASTAJA" items={this.props.selections.fisher} filteredData={this.state.filteredData} filters={this.state.selectedFilters} selectedType={this.state.selectedType}/>
          <CommonFilterSelection type="gear" handleSelect={this.handleSelect}  title="VÄLINE" items={this.props.selections.gear} filteredData={this.state.filteredData} filters={this.state.selectedFilters} selectedType={this.state.selectedType}/>
          <PlaceFilterSelection type="placeId" handleSelect={this.handleSelect}  title="PAIKKA" items={this.props.places} filteredData={this.state.filteredData} filters={this.state.selectedFilters} selectedType={this.state.selectedType}/>
      </div>

      chooseFilterText = "Tallenna suodatus";
    }

		return(
			<div className="dark-text">
        {filterSelections}
				<Grid>
					<Row>
						<Col xs={4} xsOffset={4}>
							<button className="btn btn-primary" onClick={this.addFilter}>
								{chooseFilterText}
							</button>
              <button className="btn btn-danger" onClick={this.removeFilters}>
                Poista suodattimet
              </button>
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
}