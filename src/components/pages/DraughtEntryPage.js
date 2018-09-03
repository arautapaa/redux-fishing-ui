import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import Header from '../common/Header.js';
import LoadingIndicator from '../common/LoadingIndicator';

import DraughtDisplay from '../draught/DraughtDisplay';

class DraughtEntryPage extends React.Component {

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		const id = this.props.match.params.id;
		this.props.dispatch({type : 'GET_DRAUGHT', id : id})
	}

	render() {
		let content = <DraughtDisplay draught={this.props.draught} />

		if(Object.keys(this.props.draught).length == 0) {
			content = <LoadingIndicator />
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

  return {
    draught : draught
  };
}
export default connect(mapStateToProps)(DraughtEntryPage);