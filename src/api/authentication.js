import Cookies from 'universal-cookie';
import * as ENV from '../environment'; 

import AWS from 'aws-sdk';

export default class AuthenticationAPI {
	static authenticate(id_token) {
		return new Promise((resolve) => {
			AWS.config.region = ENV.AWS_REGION;	

			const credentials = new AWS.CognitoIdentityCredentials({
			    IdentityPoolId: ENV.COGNITO_IDENTITY_POOL_ID,
				Logins : {
					'accounts.google.com' : id_token
				}
			});


			credentials.get(function() {
				const cookies = new Cookies();


				if(!credentials.expired) {

					cookies.set('accessKeyId_v2', credentials.accessKeyId, { expires : credentials.expireTime });
					cookies.set('secretAccessKey_v2', credentials.secretAccessKey, { expires : credentials.expireTime });
					cookies.set('sessionToken_v2', credentials.sessionToken, { expires : credentials.expireTime });

					resolve(credentials);
				} else {
					AuthenticationAPI.authenticate(id_token).then((response) => {
						resolve(response);
					});
				}
			});
		});
	}

	static getCredentials() {
		const cookies = new Cookies();

		return {
			'accessKeyId' : cookies.get('accessKeyId_v2'),
			'secretAccessKey' : cookies.get('secretAccessKey_v2'),
			'sessionToken' : cookies.get('sessionToken_v2')
		}
	}

	static isAuthenticated() {
		const credentials = AuthenticationAPI.getCredentials();

		return credentials.accessKeyId && credentials.secretAccessKey && credentials.sessionToken;
	}
}