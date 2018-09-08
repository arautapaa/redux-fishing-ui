import React from 'react';
import { Redirect } from 'react-router-dom';
import Moment from 'react-moment';

export default class TableDataRow extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			redirect : false
		}

		this.move = this.move.bind(this);
	}

	move(event) {
		this.setState({
			redirect : true
		})
	}

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
				value = <Moment date={date} format="DD.MM.YYYY [klo] HH:mm" />
			} else if(field.type && field.type == 'weight') {
				value = (value / 1000).toFixed(2);
			}

			return <td key={index}>{value}</td>
		})

		const link = "/draught/" + this.props.object.id;

		if(this.state.redirect) {
			return <Redirect to={link} />
		}

		return(
			<tr onClick={this.move}>
				{columns}
			</tr>
		)
	}
}