import React from "react";
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
import { Redirect } from 'react-router-dom';


export default class DataSelection extends React.Component {

  constructor(props) {
    super(props);

    this.state = {...props.savedState, timeModal : {show: false, type :null}, errorMessage:null, sure : false, redirect : false }

    if(!this.state.additionalAttributes) {
      this.state.additionalAttributes = [];
    } 

    if(!this.state.catchTime) {
      this.state.catchTime = new Date();
    }

    this.handleSelect = this.handleSelect.bind(this);
    this.handleTimeSelect = this.handleTimeSelect.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onTimeChange = this.onTimeChange.bind(this);
    this.addAttribute = this.addAttribute.bind(this);
    this.onAttributeChange = this.onAttributeChange.bind(this);
    this.removeAttribute = this.removeAttribute.bind(this);

    this.save = this.save.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  componentDidMount() {
    this.setState({...this.props.savedState});
  }

  componentDidUpdate(prevProps) {
    if(prevProps.savedState != this.props.savedState) {
      this.setState({...this.props.savedState})
    }
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

  redirect() {
    if(!this.state.sure) {
      this.setState({
        sure : true
      })
    } else {
      this.setState({
        redirect : true
      })
    }
  }

  removeAttribute(index) {
    const attributes = this.state.additionalAttributes.slice();

    attributes.splice(index, 1);

    this.setState({
      additionalAttributes : attributes
    })
  }

  save() {
    let errorMessage = null;

    if(!this.state.fish) {
      errorMessage = "Kalaa ei ole valittu";
    } else if(!this.state.gear) {
      errorMessage = "Välinettä ei ole valittu";
    } else if(!this.state.place) {
      errorMessage = "Paikkaa ei ole valittu";
    } else if(!this.state.weight) {
      errorMessage = "Painoa ei ole asetettu";
    }

    this.setState({
      errorMessage : errorMessage
    });

    if(errorMessage == null) {
      const fisher = this.state.fisher ? this.state.fisher.name : null

      const data = {
        fish : this.state.fish.name,
        gear : this.state.gear.name,
        placeId : this.state.place.id,
        place : this.state.place,
        fisher : fisher,
        weight: this.state.weight,
        catchTime : this.state.catchTime.toISOString(),
        additionalAttributes : this.state.additionalAttributes
      };

      if(this.state.id) {
        this.props.update(this.state, this.state.id, data);
      } else {
        this.props.save(this.state, data);
      }
    } else {
      window.scrollTo(0,0)
    }
  }

  render() {
    const weightSelection = this.state.fish ? <WeightSelection type="weight"  selectedValue={this.state.weight} handleSelect={this.handleSelect}  title="PAINO" selectedFish={this.state.fish}/> : null;
    const errorMessage = this.state.errorMessage ? <h4 className="text-center red-text">{this.state.errorMessage}</h4> : null
    const redirect = this.state.redirect ? <Redirect to="/" /> : null;
    const cancelText = this.state.sure ? "Oletko varma?" : "Peruuta";

    if(redirect) {
      return redirect;
    }

    return(
      <div>
        <h1 className="text-center dark-text">Uusi saalis</h1>
        {errorMessage}
        <CommonSelection type="fish"  selectedItem={this.state.fish}    handleSelect={this.handleSelect}  title="KALA" items={this.props.choices.selections.fish} />
        <CommonSelection type="place"   selectedItem={this.state.place}   handleSelect={this.handleSelect}  title="PAIKKA" items={this.props.choices.places} />
        <CommonSelection type="gear"  selectedItem={this.state.gear}    handleSelect={this.handleSelect}  title="VÄLINE" items={this.props.choices.selections.gear} />
        <CommonSelection type="fisher"  selectedItem={this.state.fisher}  handleSelect={this.handleSelect}  title="KALASTAJA" items={this.props.choices.selections.fisher} />
        {weightSelection}
        <TimeSelection selectedTime={this.state.catchTime} onTimeSelect={this.handleTimeSelect}/>
        <TimeSelectionModal 
          show={this.state.timeModal.show}
          type={this.state.timeModal.type}
          close={this.closeModal}
          onTimeChange={this.onTimeChange}
          selectedTime={this.state.catchTime}
        />

        <AdditionalAttributeSelection 
          onAttributeChange={this.onAttributeChange} 
          addAttribute={this.addAttribute} 
          removeAttribute={this.removeAttribute}
          additionalAttributes={this.state.additionalAttributes} />
        <Row className="margin-top-30">
            <Col xs={12} sm={3} smOffset={3}>
              <Button bsSize="large" bsStyle="primary" className="btn-block" onClick={this.save}>
                  Tallenna 
                  <Glyphicon className="spacy-glyph" glyph="save" />
              </Button>
            </Col>
            <Col xs={12} sm={3} className="col-sm-offset-right-3">
              <Button bsSize="large" bsStyle="danger" className="btn-block pull-right" onClick={this.redirect}>
                  {cancelText} 
                  <Glyphicon className="spacy-glyph" glyph="remove" />
              </Button>
            </Col>
        </Row>
      </div>
    )
  }
} 

