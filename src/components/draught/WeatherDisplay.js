import React from 'react';
export default class WeatherDisplay extends React.Component {

	constructor(props) {
		super(props);
	}


	render() {
		const {temperature, airpressure, windspeed} = this.props.weather;

		return(
			<div>
				<h4>SÄÄTIEDOT</h4>
				<dl className="dl-horizontal">
					<dt>Lämpötila</dt>
					<dd>{temperature} C</dd>
					<dt>Ilmanpaine</dt>
					<dd>{airpressure}</dd>
					<dt>Tuulen nopeus</dt>
					<dd>{windspeed}</dd>
				</dl>
			</div>
		)
	}
}