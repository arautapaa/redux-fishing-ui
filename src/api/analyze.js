import APIGateway from './apigateway';

export default class DraughtAnalysis {
	static getDraughtAnalysis() {
    	return APIGateway.sendRequest("/draughts/analysis", "GET", {});
	}
}