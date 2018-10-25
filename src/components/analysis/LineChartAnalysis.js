import React from 'react';

import { Grid, Row, Col } from 'react-bootstrap';
import {Bar } from 'react-chartjs-2';

export default class LineChartAnalysis extends React.Component {

	constructor(props) {
		super(props);

		this.handleBarClick = this.handleBarClick.bind(this);
		this.getLabelName = this.getLabelName.bind(this);
	}

	getLabelName(filter) {
		const selectedFilters = filter.selectedFilters;

		let filterComponents = [];

		Object.keys(selectedFilters).forEach((filtername) => {
			let filtervalues = selectedFilters[filtername].slice();

			filtervalues.forEach((value, index) => {
				if(typeof value == "object") {
					filtervalues[index] = value.min + "-" + value.max;
				}
			})

			const filtervaluestr = filtervalues.join(",");
			filterComponents.push(filtername + ":" + filtervaluestr);
		});

		return filterComponents.join(" ; ");
	}

	handleBarClick(element) {
		if(element.length > 0) {
			const labels = element[0]._model.label.split("-");

			this.props.modifyFilter({
				index : element[0]._datasetIndex,
				type : this.props.keyname,
				values : {
					min : parseInt(labels[0]),
					max : parseInt(labels[1])
				}
			})
		}
	}

	render() {
		const colors = ['rgba(255, 99, 132, 0.7)', 'rgba(0, 99, 132, 0.7)', 'rgba(201, 49, 132, 0.7)'];
		const datasets = [];
		let labels = null;

		const values = [];

		this.props.data.forEach((filter) => {
			filter.filteredData.forEach((draught) => {
				const fields = this.props.keyname.split(".");
				let value = draught;

				fields.forEach((field) => {
					value = value[field];
				});

				value = this.props.parse(value);

				values.push(value);
			});
		});

		values.sort((a,b) => {
			return a-b;
		});

		
		const min = parseInt(values[0] / this.props.range) * this.props.range;
		const max = (parseInt(values[values.length - 1] / this.props.range) * this.props.range) + this.props.range;


		this.props.data.forEach((filter, index) => {

			const labelName = this.getLabelName(filter);

			const values = [];

			for(let i = min; i < max; i += this.props.range) {
				const offset = this.props.offset || 0;
				const upbound = i + this.props.range - offset;

				const matching = filter.filteredData.filter((draught) => {
					const fields = this.props.keyname.split(".");
					let value = draught;

					fields.forEach((field) => {
						value = value[field];
					});

					value = this.props.parse(value);

					if(this.props.range == 1) {
						return value == i;
					} else {
						return value >= i && value < upbound;
					}
				});

				let label = i;

				if(this.props.range != 1) {
					label += "-" + (upbound);
				}

				values.push({
					label : label,
					amount : matching.length
				});
			}

			if(labels == null) {
				labels = values.map((dataentry) => {
					return dataentry.label;
				});
			}

			const dataValues = values.map((dataentry) => {
				return dataentry.amount;
			})

			datasets.push({
				label : labelName,
				fill : false,
				backgroundColor : colors[index],
				data : dataValues
			})
		});


		const dataOptions = {
			labels : labels,
			datasets : datasets
		}

		const showOptions = {
			scales: {
		        yAxes: [{
		            ticks: {
		                beginAtZero: true
		            }
		        }]
		    },
		    legend: {
	            labels: {
	                // This more specific font property overrides the global property
	                fontSize: 24
	            }
	        }
		}

		return(
			<Grid className="dark-text">
				<h3>{this.props.headerName}</h3>
				<Bar data={dataOptions} options={showOptions} getElementAtEvent={this.handleBarClick}/>
			</Grid>
		)
	}
}