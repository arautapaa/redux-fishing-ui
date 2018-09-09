import React from 'react';
import Header from '../common/Header';
import DataTableDisplay from '../common/table/DataTableDisplay';
import { Grid, Row, Col} from 'react-bootstrap'; 
import { ExtendedGoogleMap } from '../common/map/ExtendedGoogleMap';
import { connect } from 'react-redux';
import PlaceAddForm from '../places/PlaceAddForm';
import LoadingIndicator from '../common/LoadingIndicator';

class PlacePage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			newPlace : {
				name : null,
				latitude : null,
				longitude : null,
				new : true
			},
			samename : false
		}

		this.fields = [{
			header : 'Paikan nimi',
			key : 'name'
		}, {
			header : 'Leveys',
			key : 'latitude'
		}, {
			header : 'Pituus',
			key : 'longitude'
		}];

		this.onMapClick = this.onMapClick.bind(this);
		this.onInputChange = this.onInputChange.bind(this);
		this.savePlace = this.savePlace.bind(this);
		this.handleHeaderClick = this.handleHeaderClick.bind(this);
		this.calculateMiddle = this.calculateMiddle.bind(this);
	}

	handleHeaderClick(key, desc) {
		this.fields.map((item) => {
	      if(item.key == key) {
	        item.active = true;
	      } else {
	        item.active = false;
	      }
	    })

		this.props.dispatch({type: 'SORT_PLACES', field : key, desc : desc})
	}

	onMapClick(event) {
		const newPlace = this.state.newPlace || {};

		newPlace.latitude = event.latLng.lat();
		newPlace.longitude = event.latLng.lng();

		this.setState({
			newPlace : newPlace
		})
	}

	componentDidUpdate(prevProps) {
		if(prevProps.places.length != this.props.places.length) {
			this.setState({
				newPlace : {
					name : null,
					latitude : null,
					longitude : null,
					new : true
				}
			});
		}
	}

	onInputChange(name, value) {
		const place = this.state.newPlace;

		place[name] = value;

		this.setState({
			newPlace : place
		})
	}

	componentWillMount() {
		this.props.dispatch({type : 'GET_PLACES'});
	}

	savePlace() {
		const place = {
			name : this.state.newPlace.name,
			latitude : this.state.newPlace.latitude,
			longitude : this.state.newPlace.longitude
		};

		const withSameName = this.props.places.filter((item) => {
			return item.name == place.name
		});

		this.setState({
			samename : withSameName.length > 0
		})

		if(withSameName.length > 0) {

		} else {
			this.props.dispatch({type: 'SAVING_PLACE'});
			this.props.dispatch({type : 'SAVE_PLACE', place : this.state.newPlace});
		}
	}

	calculateMiddle() {
		const position = {
			latTotal : 0,
			lonTotal : 0
		};

		const size = this.props.places.length;

		this.props.places.forEach((item) => {
			position.latTotal += item.latitude
			position.lonTotal += item.longitude
		});

		return {
			latitude : (position.latTotal / size),
			longitude : (position.lonTotal / size)
		};

	}

	render() {


		let placeForm = this.state.newPlace.latitude ? <Row><Col xs={12} sm={8} md={6}><PlaceAddForm savePlace={this.savePlace} onInputChange={this.onInputChange}/></Col></Row> : null
		let map = <LoadingIndicator />

		if(this.props.places && this.props.places.length > 0) {	
			const markers = this.props.places.slice();

			if(this.state.newPlace.latitude) {
				markers.push(this.state.newPlace);
			}

			const {latitude, longitude} = this.calculateMiddle();

			map = <ExtendedGoogleMap
          		googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCpgoPa6EbBkJOK1m01CcZLN1nHeFkhuRQ&v=3.exp&libraries=geometry,drawing,places"
	          	loadingElement={<div style={{ height: `100%` }} />}
	          	containerElement={<div style={{ height: `400px` }} />}
		   		mapElement={<div style={{ height: `100%` }} />}
				position={{ lat: latitude, lng: longitude}}
				defaultZoom={13}
				onClick={this.onMapClick}
				places={markers} 
			/>
		}

		if(this.props.saving) {
			placeForm = <LoadingIndicator />
		}
	
		const samenameNotification = this.state.samename ? <h4 className="dark-text">Sinulla on jo paikka tällä nimellä.</h4> : null;

		return(
			<div>
				<Header {...this.props} />
				<Grid>
					<Row className="margin-top-30">
						<Col xs={12}>
							{map}
						</Col>
					</Row>
					<Row>
						<Col xs={12}>
							{samenameNotification}
						</Col>
					</Row>
					<Row>
						<Col xs={12}>
							<p className="dark-text">Voit lisätä uuden paikan klikkaamalla karttaa.</p>
						</Col>
					</Row>
					{placeForm}
					<Row>
						<Col xs={12}>
							<DataTableDisplay activeField={this.props.activeField} handleHeaderClick={this.handleHeaderClick} fields={this.fields} objects={this.props.places}/>
						</Col>
					</Row>
				</Grid>
			</div>
		)
	}
}

// export the connected class
function mapStateToProps(state, ownprops) {
	return {
		places : state.places.entries || [],
		saving : state.places.saving,
		activeField : state.places.activeField
	}
}
export default connect(mapStateToProps)(PlacePage);

