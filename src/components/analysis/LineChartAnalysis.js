import React from 'react';

import { Grid, Row, Col } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';

export default class LineChartAnalysis extends React.Component {
	render() {
		const data = Object.keys(this.props.data).map((key) => {
			let label = key;

			if(this.props.labeltype == 'numeric') {
				label = parseInt(key);
			}

			return {
				label : label,
				value : this.props.data[key].length,
				objects : this.props.data[key]
			}
		});

		data.sort(this.props.sortHandler);

		let refinedData = [];

		if(this.props.labeltype == 'numeric') {
			for(let i = data[0].label, j = 0; i <= data[data.length - 1].label; i++) {
				let dataobject = null;

				if(this.props.data[i] != null) {
					dataobject = data[j++];
				}

				if(!dataobject) {
					dataobject = {
						label : i,
						value : 0,
						objects : []
					}
				}

				refinedData.push(dataobject)
			}
		} else {
			refinedData = data;
		}

		const labels = refinedData.map((dataentry) => {
			return dataentry.label
		})

		const dataValues = refinedData.map((dataentry) => {
			return dataentry.value
		})

		const dataOptions = {
			labels : labels,
			datasets : [{
				label : this.props.labelName,
				fill : false,
				data : dataValues
			}]
		}

		return(
			<Grid className="dark-text">
				<h3>{this.props.headerName}</h3>
				<Line data={dataOptions} />
			</Grid>
		)
	}
}