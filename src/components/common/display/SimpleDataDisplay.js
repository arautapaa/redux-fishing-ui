import React from 'react';

export default class SimpleDataDisplay extends React.Component {
	render() {
		
		const items = this.props.data.map((item, index) => {
			return(<dt>{item.title}</dt><dd>{item.value}</dd>);
		})

		return(
			<dl className="dl-horizontal">
				{items};
			</dl>
		);
	}
}