import React from 'react';
import GoogleLogin from 'react-google-login';
import { Redirect } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import * as EnvironmentConfiguration from '../../environment';
import AuthenticationAPI from '../../api/authentication';

export default class LoginPage extends React.Component {
	constructor(props) {

		super(props);

		this.state = {
			redirect : false
		}

		this.responseGoogle = this.responseGoogle.bind(this);
		this.renderRedirect = this.renderRedirect.bind(this);
	}

	responseGoogle(response) {
		const self = this;

		AuthenticationAPI.authenticate(response.getAuthResponse()['id_token']).then((credentials) => {
			self.setState({
				redirect : true
			})
		});
	}

	renderRedirect() {
		if(this.state.redirect) {
			return(<Redirect to="/" />);
		}
	}

	render() {
		return(
			<div className="login-page">
				<Grid>
					<div className="login-container">
						<h1 className="text-center">KALAKIRJA</h1>
						{this.renderRedirect()}
						<Row>
							<Col xs={2} xsOffset={5}>
								<GoogleLogin
								className="btn btn-lg google-login-button"
							    clientId={EnvironmentConfiguration.GOOGLE_CLIENT_ID}
							    buttonText="Kirjaudu sisään"
							    onSuccess={this.responseGoogle}
							    onFailure={this.responseGoogle}
								/>
							</Col>
						</Row>
					</div>
				</Grid>
			</div>
		)
	}
}