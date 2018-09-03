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

		if(this.props.active) {
			classValue += " active";
		}

		return(
			<Col xs={12} sm={6} md={3}>
				<Link to={this.props.url}>
					<div className={classValue}>
						{this.props.text}		
					</div>
				</Link>
			</Col>
		)
	}
}