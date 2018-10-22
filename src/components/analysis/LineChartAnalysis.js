import React from 'react';

import { Grid, Row, Col } from 'react-bootstrap';
import {Bar } from 'react-chartjs-2';

export default class LineChartAnalysis extends React.Component {
	render() {
		const colors = ['rgba(255, 99, 132, 0.7)', 'rgba(0, 99, 132, 0.7)', 'rgba(201, 49, 132, 0.7)'];
		const filters = [];

		this.props.data.forEach((filteredData) => {
			const draughts = filteredData.filteredData[this.props.keyname]

			const data = Object.keys(draughts).map((key) => {
				let label = key;

				if(this.props.labeltype == 'numeric') {
					label = parseInt(key);
				}

				return {
					label : label,
					value : draughts[key].length,
					objects : draughts[key]
				}
			});

			filters.push(data);
		});

		let datasets = [];
		let labels = null;

		filters.forEach((data, index) => {
			data.sort(this.props.sortHandler);
			
			let refinedData = [];

			if(this.props.labeltype == 'numeric') {

				for(let i = data[0].label, j = 0; i <= data[data.length - 1].label; i++) {
					let dataobject = null;

					if(this.props.data[index].filteredData[this.props.keyname][i] != null) {
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


			if(!labels) {
				labels = refinedData.map((dataentry) => {
					return dataentry.label
				})
			}

			const dataValues = refinedData.map((dataentry) => {
				return dataentry.value
			})

			datasets.push({
				label : this.props.labelName + " " + (index + 1),
				fill : false,
				backgroundColor : colors[index],
				data : dataValues
			})

		});


		const dataOptions = {
			labels : labels,
			datasets : datasets
		}

		return(
			<Grid className="dark-text">
				<h3>{this.props.headerName}</h3>
				<Bar data={dataOptions} />
			</Grid>
		)
	}
}