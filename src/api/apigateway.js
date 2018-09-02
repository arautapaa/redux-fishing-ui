import AuthenticationAPI from './authentication';
import * as EnvironmentConfiguration from '../environment';
import ApiGateWayFactory from 'aws-api-gateway-client';

export default class APIGateway {
  static getData(path) {
    return APIGateway.sendRequest(path, "GET", {}); 
  }

  static sendRequest(path, method, body) {
  	return new Promise((resolve, reject) => {
      const API_GATEWAY_URL = EnvironmentConfiguration.API_GATEWAY_URL;

      const credentials = AuthenticationAPI.getCredentials();

      const apigClientFactory = ApiGateWayFactory;

      const apigClient = apigClientFactory.newClient({
        invokeUrl: API_GATEWAY_URL, // REQUIRED
        accessKey: credentials.accessKeyId, // REQUIRED
        secretKey: credentials.secretAccessKey, // REQUIRED
        sessionToken: credentials.sessionToken, //OPTIONAL: If you are using temporary credentials you must include the session token
        region: EnvironmentConfiguration.AWS_REGION, // REQUIRED: The region where the API is deployed.
        systemClockOffset: 0, // OPTIONAL: An offset value in milliseconds to apply to signing time
        retries: 4, // OPTIONAL: Number of times to retry before failing. Uses axon-retry plugin.
        retryCondition: (err) => { // OPTIONAL: Callback to further control if request should be retried.  Uses axon-retry plugin.
          return err.response && err.response.status === 500;
        }
      });
        
      apigClient.invokeApi({}, path, method, {}, body).then((response) => {
        resolve(response.data);
      }).catch((error) => {
        reject(error);
      });
    });
  }
} 