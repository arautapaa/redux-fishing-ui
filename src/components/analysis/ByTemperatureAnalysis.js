import React from 'react';

import { Grid, Row, Col } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';

export default class LineChartAnalysis extends React.Component {
	render() {
		const data = Object.keys(this.props.data).map((key) => {
			return {
				label : key,
				value : this.props.data[key].length,
				objects : this.props.data[key]
			}
		});

		data.sort((a, b) => {
			const aSplit = a.label.split("-")[0];
			const bSplit = b.label.split("-")[0];

			return parseInt(aSplit) - parseInt(bSplit);
		});

		const labels = data.map((dataObject) => {
			return dataObject.label
		});

		const dataValues = data.map((dataObject) => {
			return dataObject.value
		});

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
				<Line data={dataOptions} />
			</Grid>
		)
	}
}