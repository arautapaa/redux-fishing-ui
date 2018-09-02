import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class MenuIcon extends React.Component {
	render() {
		const icon = this.props.icon;

		let classValue = "icon-box text-center";

		if(icon) {
			classValue += " menu-icon-" + icon;
		}

		return(
			<Col xs={12} sm={6} md={3}>
				<div className={classValue}>
					<Link to={this.props.url}>{this.props.text}</Link>		
				</div>
			</Col>
		)
	}
}