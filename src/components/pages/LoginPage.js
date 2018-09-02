import React from 'react';
import GoogleLogin from 'react-google-login';
import { Redirect } from 'react-router-dom';
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
			<div className="container">
				{this.renderRedirect()}
				<GoogleLogin
				    clientId={EnvironmentConfiguration.GOOGLE_CLIENT_ID}
				    buttonText="Login"
				    onSuccess={this.responseGoogle}
				    onFailure={this.responseGoogle}
				/>
			</div>
		)
	}
}