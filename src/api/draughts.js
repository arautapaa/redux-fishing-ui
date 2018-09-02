import APIGateway from './apigateway'; 

// API Users static class
export default class DraughtAPI {

  static getAllDraughts() {
  	return new Promise((resolve) => {
  		Promise.all([DraughtAPI.getDraughtList(), DraughtAPI.getPlaces()]).then((response) => {
  			response[0].forEach((item) => {
  				response[1].forEach((place) => {
  					if(item.placeId == place.id) {
  						item.place = place;
  					}
  				});
  			});
  			resolve(response[0]);
  		});
  	});
  }

  static getAllSelections() {
  	return new Promise((resolve) => {
  		Promise.all([DraughtAPI.getSelections(), DraughtAPI.getPlaces()]).then((response) => {
        Object.keys(response[0]).forEach((key) => {
          response[0][key].sort((a,b) => {
            return a.name > b.name;
          });
        })

        response[1].sort((a,b) => {
          return a.name > b.name;
        });

  			resolve({
  				selections : response[0],
  				places : response[1]
  			});
  		});
  	});
  }

  // get a list of draughts
  static getDraughtList() {
    return APIGateway.getData("/draughts");
  }

  static getPlaces() {
  	return APIGateway.getData("/places");
  }

  static getSelections() {
  	return APIGateway.getData("/selections");
  }
}