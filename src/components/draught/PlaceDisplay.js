import React from 'react';

export default class PlaceDisplay extends React.Component {

	constructor(props) {
		super(props);
	}


	render() {
		const {name, latitude, longitude} = this.props.place;

		return(
			<div>
				<h4>PAIKKATIEDOT</h4>
				<dl className="dl-horizontal">
					<dt>Paikan nimi</dt>
					<dd>{name}</dd>
					<dt>Leveyspiiri</dt>
					<dd>{latitude}</dd>
					<dt>Pituuspiiri</dt>
					<dd>{longitude}</dd>
				</dl>
			</div>
		)
	}
}