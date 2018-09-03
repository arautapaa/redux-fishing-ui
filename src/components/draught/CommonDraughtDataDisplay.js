import React from 'react';
import Moment from 'react-moment';

export default class CommonDraughtDataDisplay extends React.Component {

	constructor(props) {
		super(props);
	}


	render() {
		const { fish, fisher, gear, weight, catchTime } = this.props.draught;

		return(
			<div>
				<h4>PERUSTIEDOT</h4>
				<dl className="dl-horizontal">
					<dt>Kala</dt>
					<dd>{fish}</dd>
					<dt>Väline</dt>
					<dd>{gear}</dd>
					<dt>Kalastaja</dt>
					<dd>{fisher}</dd>
					<dt>Paino</dt>
					<dd>{weight}</dd>
					<dt>Ajankohta</dt>
					<dd>
						<Moment date={catchTime} format="DD.MM.YYYY HH.mm.ss" />
					</dd>
				</dl>
			</div>
		)
	}
}