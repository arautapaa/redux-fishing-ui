import APIGateway from './apigateway';

// API Places static class
export default class PlacesAPI {
	static getPlaces() {
		return APIGateway.getData('/places');
	}

	static savePlace(place) {
		return APIGateway.sendRequest('/places', 'POST', place);
	}
}