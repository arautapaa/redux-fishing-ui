import React from 'react';

export default class AdditionalInfoDisplay extends React.Component {

	constructor(props) {
		super(props);
	}


	render() {
		return(
			<div>
				<h4>LISÄINFO</h4>
			      <dl className="dl-horizontal">
			        {this.props.additionalAttributes.reduce((acc, item, idx) => {
			            return acc.concat([
			                <dt key={`name-${idx}`}>{item.name}</dt>,
			                <dd key={`value-${idx}`}>{item.value}</dd>
			            ]);
			        }, [])}
			      </dl>
			</div>
		)
	}
}