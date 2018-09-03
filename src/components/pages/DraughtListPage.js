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

		this.handleHeaderClick = this.handleHeaderClick.bind(this);
	}

  componentWillMount() {
    this.props.dispatch({type : 'RESET_REDIRECT'})
    this.props.dispatch({type: 'DRAUGHTS_GET_ALL'});
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

      let content = <LoadingIndicator />

  		if(!this.props.fetching) {
        content = <DataTable fields={this.fields} objects={this.props.draughts.draughts} handleHeaderClick={this.handleHeaderClick}/>
  		} 
  		
      return(
        <div>
          <Header {...this.props} />
          <Grid>
            {content}
  	   		</Grid>
        </div>
      );
  	}
}

// export the connected class
function mapStateToProps(state, props) {
  let loading = state.draughts.loading;

  return {
    draughts: state.draughts || [],
    fetching : loading,
  };
}
export default connect(mapStateToProps)(DraughtListPage);
