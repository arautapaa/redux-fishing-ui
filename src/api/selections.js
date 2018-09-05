import APIGateway from './apigateway';

// API Selections static class
export default class SelectionAPI {
	static saveSelection(selection) {
		return APIGateway.sendRequest('/selections', 'POST', selection);
	}
}