import React from "react";
import { connect } from "react-redux";
import { Grid, Row, Col, Button, Glyphicon } from 'react-bootstrap';
import DataTable from '../common/table/DataTable';
import LoadingIndicator from '../common/LoadingIndicator';
import Header from '../common/Header';
import CommonSelection from '../add/CommonSelection';
import WeightSelection from '../add/WeightSelection';
import TimeSelection from '../add/TimeSelection';
import AdditionalAttributeSelection from '../add/AdditionalAttributeSelection';
import TimeSelectionModal from '../add/TimeSelectionModal';
import Calendar from 'react-calendar';
import SuccessfulDraughtAdd from '../add/SuccessfulDraughtAdd';
import DataSelection from '../add/DataSelection';

import { Redirect } from 'react-router-dom';

// Home page component
export class DraughtAddPage extends React.Component {

	constructor(props) {
		super(props);

    this.state = {
      savedEntry : {},
      savedState : {}
    }

		this.handleSelect = this.handleSelect.bind(this);
    this.handleTimeSelect = this.handleTimeSelect.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onTimeChange = this.onTimeChange.bind(this);
    this.addAttribute = this.addAttribute.bind(this);
    this.onAttributeChange = this.onAttributeChange.bind(this);
    this.removeAttribute = this.removeAttribute.bind(this);

    this.onSelectNew = this.onSelectNew.bind(this);
    this.save = this.save.bind(this);
    this.update = this.update.bind(this);
    this.addSelection = this.addSelection.bind(this);
	}

  componentWillMount() {
    this.props.dispatch({ type: 'SELECTIONS_GET_ALL'});
    this.props.dispatch({ type : 'COPY_NEW_DRAUGHT'});

    if(this.props.match && this.props.match.params.id && (!this.props.draughtToEdit || Object.keys(this.props.draughtToEdit).length == 0)) {
      this.props.dispatch({type : 'GET_DRAUGHT', id :  this.props.match.params.id})
    }
  }

  componentDidUpdate() {
    if(this.props.draughtToEdit.id && !this.state.savedState.id) {
      const savedState = this.convertToState(this.props.draughtToEdit);

      this.setState({
        savedState : savedState,
        savedData : this.props.draughtToEdit
      })
    }
  }

  convertToState(draught) {
    const state = {...draught,
      fish : this.getSelectionByName('fish', draught.fish),
      gear : this.getSelectionByName('gear', draught.gear),
      place : draught.place,
      fisher : this.getSelectionByName('fisher', draught.fisher),
      catchTime : new Date(draught.catchTime),
      weight: draught.weight
    }

    return state;
  }

  getSelectionByName(type, name) {
    return this.props.choices.selections[type].find(x => x.name == name)
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

    onAttributeChange(attribute) {
      const attributes = this.state.additionalAttributes.slice();

      attributes[attribute.index] = {
        name : attribute.name,
        value : attribute.value
      }

      this.setState({
        additionalAttributes : attributes
      })
    }
    
    addAttribute(attribute) {
      const attributes = this.state.additionalAttributes.slice();

      attributes.push(attribute);

      this.setState({
        additionalAttributes : attributes
      })
    }

    removeAttribute(index) {
      const attributes = this.state.additionalAttributes.slice();

      attributes.splice(index, 1);

      this.setState({
        additionalAttributes : attributes
      })
    }

    onSelectNew() {
      this.props.dispatch({ type : 'COPY_NEW_DRAUGHT'});
    }

    update(state, id, data) {
        this.setState({
          savedEntry : data,
          savedState : state
        });

        this.props.dispatch({ type : 'SAVING_DRAUGHT' });
        this.props.dispatch({ type : 'UPDATE_DRAUGHT', id : id, data : data})
    }

    save(state, data) {      
      this.setState({
        savedEntry : data,
        savedState : state
      });

      this.props.dispatch({ type : 'SAVING_DRAUGHT' });
      this.props.dispatch({ type : 'SAVE_NEW_DRAUGHT', draught : data});
    }

    addSelection(selection) { 
      this.props.dispatch({type : 'SAVE_SELECTION', selection : selection });
    }
    
  	render() {
      let content = <LoadingIndicator />

      if(this.props.draughts.updated && this.props.match && this.props.match.params.id) {
        const toLink = "/draught/" + this.props.match.params.id;
        this.props.dispatch({ type : 'UPDATE_COMPLETE'})
        return <Redirect to={toLink} />
      }

  		if(this.props.choices && this.props.choices.selections && !this.props.draughts.saving) {
  			content = <DataSelection onSelectionAdd={this.addSelection} savedState={this.state.savedState} choices={this.props.choices} save={this.save} update={this.update} />
  		}

      if(this.props.draughts.saved) {
        content = <SuccessfulDraughtAdd onSelectNew={this.onSelectNew}/>
      }
  		
      return(
  			<div>
          <Header {...this.props}/>,
          <Grid>
            {content}
          </Grid>
        </div>
  		);
	}
}

// export the connected class
function mapStateToProps(state, properties) {

  let draughtToEdit = {}

  if(properties.match && properties.match.params.id) {
    draughtToEdit = state.draughts.draughts.find(x => x.id == properties.match.params.id) || {};
  }

  return {
    choices: state.selections || {},
    draughts : state.draughts || {},
    draughtToEdit : draughtToEdit
  };
}
export default connect(mapStateToProps)(DraughtAddPage);
