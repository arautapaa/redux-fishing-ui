import React from "react";
import { connect } from "react-redux";
import { Grid, Row, Col } from 'react-bootstrap';
import DataTable from '../common/table/DataTable';
import LoadingIndicator from '../common/LoadingIndicator';
import Header from '../common/Header';
import CommonSelection from '../add/CommonSelection';
import WeightSelection from '../add/WeightSelection';

// Home page component
export class DraughtAddPage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			fish : null,
			gear : null,
			place : null,
			fisher : null,
			weight: null
		};

		this.props.dispatch({type: 'SELECTIONS_GET_ALL'});

		this.handleSelect = this.handleSelect.bind(this);
	}

  	handleSelect(item, type) {
  		this.setState({[type] : item});
  	}

  	render() {
  		if(!this.props.choices || !this.props.choices.selections) {
  			return <LoadingIndicator />
  		}

      const weightSelection = this.state.fish ? <WeightSelection type="weight"  selectedValue={this.state.weight} handleSelect={this.handleSelect}  title="PAINO" selectedFish={this.state.fish}/> : null


  		return(
  			<div>
          <Header />,
          <Grid>
    				<h1 className="text-center dark-text">Uusi saalis</h1>
    				<CommonSelection type="fish" 	selectedItem={this.state.fish}		handleSelect={this.handleSelect}	title="KALA" items={this.props.choices.selections.fish} />
    				<CommonSelection type="place" 	selectedItem={this.state.place}		handleSelect={this.handleSelect}	title="PAIKKA" items={this.props.choices.places} />
    				<CommonSelection type="gear" 	selectedItem={this.state.gear}		handleSelect={this.handleSelect}	title="VÄLINE" items={this.props.choices.selections.gear} />
    				<CommonSelection type="fisher" 	selectedItem={this.state.fisher}	handleSelect={this.handleSelect}	title="KALASTAJA" items={this.props.choices.selections.fisher} />
     			  {weightSelection}	
          </Grid>
        </div>
  		);
	}
}

// export the connected class
function mapStateToProps(state) {
  return {
    choices: state.selections || {},
  };
}
export default connect(mapStateToProps)(DraughtAddPage);
