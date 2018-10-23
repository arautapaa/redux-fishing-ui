import React from 'react';
import CommonFilterSelection from './CommonFilterSelection';
import PlaceFilterSelection from './PlaceFilterSelection';
import RangeFilterSelection from './RangeFilterSelection';
import { Grid, Row, Col } from 'react-bootstrap';

export default class FilterSelection extends React.Component {
	constructor(props) {
		super(props);


		this.state = {
			selectedFilters : {},
			selectedType : null,
			filteredData : props.draughts,
			datasets : [],
      showFilters : true
		}

		this.handleSelect = this.handleSelect.bind(this);
		this.addFilter = this.addFilter.bind(this);
    this.removeFilters = this.removeFilters.bind(this);

	}

	handleSelect(item, type) {
  		let selectedFilters = JSON.parse(JSON.stringify(this.state.selectedFilters));

      if(typeof item == 'object') {
        selectedFilters[type] = [];
      } else {
    		if(!selectedFilters[type]) {
    			selectedFilters[type] = [];
    		}
      }

  		selectedFilters[type].push(item);

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
  			let draughts = this.props.draughts.slice();

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
  		})
  	}

  	addFilter() {
      if(this.state.showFilters) {
    		const datasets = this.state.datasets.slice();

    		this.props.addFilter({
    			selectedFilters : this.state.selectedFilters
    		});

    		this.setState({
    			datasets : datasets,
    			filteredData : this.props.draughts,
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
        filteredData : this.props.draughts,
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