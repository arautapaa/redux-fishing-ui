import React from "react";
import { connect } from "react-redux";
import { Grid, Row, Col } from 'react-bootstrap';
import DataTable from '../common/table/DataTable';
import Header from '../common/Header';
import LoadingIndicator from '../common/LoadingIndicator';

// Home page component
export class DraughtListPage extends React.Component {

	constructor(props) {
		super(props);

    this.fields = [{
      header : "Pvm",
      key : "catchTime",
      type : "date",
      desc : true
    }, {
      header : "Kala",
      key : "fish"
    }, {
      header : "Kalastaja",
      key : "fisher"
    }, {
      header : "Väline",
      key : "gear"
    }, {
      header : "Paino",
      key : "weight",
      type : "weight",
      desc : true
    }, {
      header : "Paikka",
      key : "place.name"
    }];

    if(!this.props.draughts || Object.keys(this.props.draughts).length == 0) {
      props.dispatch({type: 'DRAUGHTS_GET_ALL'});
    }

		this.handleHeaderClick = this.handleHeaderClick.bind(this);
	}

	handleHeaderClick(key, desc) {
    this.fields.map((item) => {
      if(item.key == key) {
        item.active = true;
      } else {
        item.active = false;
      }
    })

		this.props.dispatch({type: 'DRAUGHTS_SORT', field : key, desc : desc});
	}

  
  	render() {
  		if(!this.props.draughts || Object.keys(this.props.draughts).length == 0) {
  			return(
  				<LoadingIndicator />
  			);
  		} else {
  			return(
          <div>
            <Header />
            <Grid>
  				    <DataTable fields={this.fields} objects={this.props.draughts} handleHeaderClick={this.handleHeaderClick}/>
  	   		  </Grid>
          </div>
        );
  		}


	}
}

// export the connected class
function mapStateToProps(state) {
  return {
    draughts: state.draughts || [],
  };
}
export default connect(mapStateToProps)(DraughtListPage);
