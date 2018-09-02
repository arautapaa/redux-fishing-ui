import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

export default class Footer extends React.Component {

	render() {
		return(
			<footer className="page-footer">
				<Grid>
					<Row>
						<Col md={8} xs={12}>
							<p>Test is test</p>
						</Col>
						<Col md={4} xs={8}>
							<strong>
								Madafakin gay
							</strong>
						</Col>
					</Row>
				</Grid>
			</footer>
		)
	}
}