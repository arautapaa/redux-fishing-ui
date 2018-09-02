import React from 'react';

import TableDataRow from './TableDataRow';

export default class TableBody extends React.Component {

	render() {
		const items = this.props.objects.map((object, index) => {
			return <TableDataRow key={index} object={object} fields={this.props.fields} />
		});

		return(
			<tbody>
				{items}
			</tbody>
		);
	}
}