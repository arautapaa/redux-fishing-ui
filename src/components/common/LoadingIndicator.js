import React from 'react';
import { Row, Col } from 'react-bootstrap';

export default class LoadingIndicator extends React.Component {

	render() {
		return(
			<Row>
				<Col className="margin-top-30" xs={2} xsOffset={5}>
					<div className="loader">
					</div>
				</Col>
			</Row>
		)
	}
}