import React from 'react';
import { Row, Col } from 'react-bootstrap';
import TitleBar from '../common/display/TitleBar.js';


export default class CommonSelection extends React.Component {

	constructor(props) {
		super(props);
	}


	render() {
		const buttons = this.props.items.map((item, index) => {
			let className = "btn btn-lg btn-primary";

			if(this.props.selectedItem && this.props.selectedItem.name == item.name) {
				className += " selected-active";
			}

			return <button key={index} className={className} onClick={() => {this.props.handleSelect(item, this.props.type)}}>{item.name}</button>
		});

		return(
			<Row>
				<Col xs={12} sm={12}>
					<TitleBar title={this.props.title}/>
					<Col smOffset={3} sm={6}>
						<div className="btn-group special">
							{buttons}
						</div>
					</Col>
				</Col>
			</Row>
		)
	}
}	