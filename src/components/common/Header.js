import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import MenuIcon from '../menu/MenuIcon';

export default class Header extends React.Component {
	render() {
		return(
			<header>
				<div className="jumbotron text-center">
					<h1>KALAKIRJA</h1>
				</div>
				<Grid>
					<Row>
						<MenuIcon text="KALAT" icon="fish" url="/"/>
						<MenuIcon text="UUSI SAALIS" icon="new-fish" url="/new"/>
						<MenuIcon text="PAIKAT" icon="place" url="/places"/>
						<MenuIcon text="ASETUKSET" icon="settings" url="/settings" />
					</Row>
				</Grid>
			</header>
		)
	}
}