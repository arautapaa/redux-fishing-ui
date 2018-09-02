import React from 'react';
import Moment from 'react-moment';

export default class CalendarButton extends React.Component {

	constructor(props) {
		super(props);
	}


	render() {
		return(
			<div onClick={this.props.onClick}  className="text-center icon-button selection date">
				<Moment date={this.props.selectedTime} format="DD.MM.YYYY" />
			</div>
		)
	}
}