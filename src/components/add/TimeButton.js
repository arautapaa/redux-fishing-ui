import React from 'react';
import Moment from 'react-moment';

export default class TimeButton extends React.Component {

	constructor(props) {
		super(props);
	}


	render() {
		return(
			<div onClick={this.props.onClick} className="text-center icon-button selection time">
				<Moment date={this.props.selectedTime} format="HH:mm" />
			</div>
		)
	}
}