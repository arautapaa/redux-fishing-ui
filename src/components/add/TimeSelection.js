import React from 'react';
import Calendar from 'react-calendar';
import { Row, Col } from 'react-bootstrap';
import CalendarButton from './CalendarButton';
import TimeButton from './TimeButton';


export default class TimeSelection extends React.Component {

	render() {
		return(
			<Row className="nopadding margin-top-30">
				<Col sm={6}>
					<CalendarButton onClick={() => this.props.onTimeSelect('date')} selectedTime={this.props.selectedTime}/>
				</Col>
				<Col sm={6}>
					<TimeButton onClick={() => this.props.onTimeSelect('time')} selectedTime={this.props.selectedTime}/>
				</Col>
			</Row>
		)
	}
}