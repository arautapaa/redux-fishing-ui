import React from 'react';
import { Modal, Button } from "react-bootstrap";
import TimePicker from 'react-times';
import Calendar from 'react-calendar';

import 'react-times/css/classic/default.css';

// User delete component
export default class TimeSelectionModal extends React.Component {
  
  constructor(props) {
  	super(props)
  	
  	this.onClockChange = this.onClockChange.bind(this);
  }

  onClockChange(time) {
  	const clock = this.props.selectedTime;

  	clock.setHours(time.hour);
  	clock.setMinutes(time.minute);

  	this.props.onTimeChange(clock);
  }

  // render
  render() {

    const {show, children, close, type, onTimeChange, selectedTime} = this.props;

    let content = <Calendar className="dark-text"
    				onChange={onTimeChange}
    				value={selectedTime}/>
    
    if(type && type == 'time') {
    	const time = selectedTime.getHours() + ":" + selectedTime.getMinutes();

    	content = <TimePicker
    		 		colorPalette="dark"
    				onTimeChange={this.onClockChange}
    				theme="classic"
    				time={time}/>
    }

    return (
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title className="dark-text">
            Change time
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {content}
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="default" onClick={close}>Close</Button>
          <Button bsStyle="primary" onClick={close}>Save</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
