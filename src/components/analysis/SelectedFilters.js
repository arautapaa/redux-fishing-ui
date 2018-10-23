import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

export default class SelectedFilters extends React.Component {
	render() {
		const filters = this.props.filters.map((filter) => {
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

				filterComponents.push(<Row><Col xs={4} xsOffset={4}><strong>{filtername}</strong>: {filtervaluestr}</Col></Row>);
			});

			return <Grid>
				<Row>
					<Col xs={4} xsOffset={4}>
						<h3>Filtterit</h3>
					</Col>
				</Row>
				{filterComponents}
			</Grid>
		})

		return(
			<div className="dark-text">
				{filters}
			</div>
		)
	}
}