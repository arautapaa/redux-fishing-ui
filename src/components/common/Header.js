import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import MenuIcon from '../menu/MenuIcon';

import { connect } from 'react-redux';

export default class Header extends React.Component {
	constructor(props) {
		super(props);


	}

	render() {
		const menuItems = [{
			text : "KALAT", icon : 'fish', url : "/"
		}, {
			text : "UUSI SAALIS", icon : 'new-fish', url : '/new'
		}, {
			text : 'PAIKAT', icon: 'place', url : '/places'
		}, {
			text : 'ASETUKSET', icon : 'settings', url : '/settings'
		}];

		const menuIcons = menuItems.map((item, index) => {
			return <MenuIcon {...item} key={index} active={this.props.location.pathname == item.url || (this.props.location.pathname.indexOf('/draught') > -1 && item.url == '/')}/>
		})

		return(
			<header>
				<div className="jumbotron text-center">
					<h1>KALAKIRJA</h1>
				</div>
				<Grid>
					<Row>
						{menuIcons}
					</Row>
				</Grid>
			</header>
		)
	}
}
