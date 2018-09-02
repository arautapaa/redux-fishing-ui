import React from 'react';

export default class TableDataRow extends React.Component {

	render() {
		const columns = this.props.fields.map((field, index) => {
			
			let value = null;

			if(field.key.indexOf(".") > -1) {
				const fieldKeySplitted = field.key.split(".");
				const first = fieldKeySplitted[0];
				const second = fieldKeySplitted[1];

				value = this.props.object[first][second];

			} else {
				value = this.props.object[field.key];
			}





			if(field.type && field.type == 'date') {
				let date = new Date(value);

				value = date.toLocaleDateString("fi-FI");			
			} else if(field.type && field.type == 'weight') {
				value = (value / 1000).toFixed(2);
			}

			return <td key={index}>{value}</td>
		})

		return(
			<tr>
				{columns}
			</tr>
		)
	}
}