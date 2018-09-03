import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import Header from '../common/Header.js';
import { Redirect } from 'react-router-dom';
import LoadingIndicator from '../common/LoadingIndicator';

import DraughtDisplay from '../draught/DraughtDisplay';

class DraughtEntryPage extends React.Component {

	constructor(props) {
		super(props);

		this.delete = this.delete.bind(this);
	}

	componentWillMount() {
		const id = this.props.match.params.id;
		this.props.dispatch({type : 'GET_DRAUGHT', id : id})
	}

	componentDidUpdate(prevProps) {
		if(!prevProps.deleted && this.props.deleted) {
			this.props.dispatch({type : 'DELETE_READY'});
		}
	}

	delete(id) {
		this.props.dispatch({ type : 'DELETE_DRAUGHT', id : id});
	}

	render() {
		let content = <DraughtDisplay delete={this.delete} draught={this.props.draught} />

		if(Object.keys(this.props.draught).length == 0) {
			content = <LoadingIndicator />
		}

		if(this.props.redirect) {
			return <Redirect to="/" />
		}

		return(
			<div>
				<Header />
				<Grid>
					<Row>
						<Col xs={12}>
							{content}
						</Col>
					</Row>
				</Grid>
			</div>
		)
	}
}

// export the connected class
function mapStateToProps(state, ownprops) {
  const draught = state.draughts.draughts.find(x => x.id == ownprops.match.params.id) || {};
  const deleted = state.draughts.deleted;
  const redirect = state.draughts.redirect || false

  return {
    draught : draught,
    deleted : deleted,
    redirect : redirect
  };
}
export default connect(mapStateToProps)(DraughtEntryPage);