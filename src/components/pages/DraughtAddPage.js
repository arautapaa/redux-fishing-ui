import React from "react";
import { connect } from "react-redux";
import { Grid, Row, Col } from 'react-bootstrap';
import DataTable from '../common/table/DataTable';
import LoadingIndicator from '../common/LoadingIndicator';
import Header from '../common/Header';
import CommonSelection from '../add/CommonSelection';
import WeightSelection from '../add/WeightSelection';
import TimeSelection from '../add/TimeSelection';
import TimeSelectionModal from '../add/TimeSelectionModal';
import Calendar from 'react-calendar';

// Home page component
export class DraughtAddPage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			fish : null,
			gear : null,
			place : null,
			fisher : null,
			weight: null,
      catchTime: new Date(),
      timeModal : {
        show : false,
        type : null
      }
		};



		this.handleSelect = this.handleSelect.bind(this);
    this.handleTimeSelect = this.handleTimeSelect.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onTimeChange = this.onTimeChange.bind(this);
	}

  componentWillMount() {
    this.props.dispatch({type: 'SELECTIONS_GET_ALL'});
  }

    handleTimeSelect(type) {
      const timeModal = this.state.timeModal;
      timeModal.type = type;
      timeModal.show = true;

      this.setState({
        timeModal : timeModal
      });
    }

  	handleSelect(item, type) {
  		this.setState({[type] : item});
  	}

    closeModal() {
      const timeModal = this.state.timeModal;

      timeModal.show = false;

      this.setState({
        timeModal : timeModal
      });
    }

    onTimeChange(date) {
      const timeModal = this.state.timeModal;

      timeModal.show = false;

      this.setState({
        catchTime : date,
        timeModal : timeModal
      })
    }

  	render() {
  		if(!this.props.choices || !this.props.choices.selections) {
  			return <LoadingIndicator />
  		}

      const weightSelection = this.state.fish ? <WeightSelection type="weight"  selectedValue={this.state.weight} handleSelect={this.handleSelect}  title="PAINO" selectedFish={this.state.fish}/> : null;

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
            <TimeSelection selectedTime={this.state.catchTime} onTimeSelect={this.handleTimeSelect}/>
            <TimeSelectionModal 
              show={this.state.timeModal.show}
              type={this.state.timeModal.type}
              close={this.closeModal}
              onTimeChange={this.onTimeChange}
              selectedTime={this.state.catchTime}
            />
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
