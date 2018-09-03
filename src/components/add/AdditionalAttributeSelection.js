import React from 'react';
import { Row, Col } from 'react-bootstrap';
import AdditionalAttribute from './AdditionalAttribute';
import TitleBar from '../common/display/TitleBar';

export default class AdditionalAttributeSelection extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const attributeList = this.props.additionalAttributes.map((item, index) => {
			return <AdditionalAttribute removeAttribute={this.props.removeAttribute} onAttributeChange={this.props.onAttributeChange} index={index} key={index} name={item.name} value={item.value} />
		});

		return(
			<Row className="margin-top-30">
				<Col xs={12}>		
					<TitleBar title="LISÄTIEDOT"/>
					<button className="btn btn-lg btn-primary" onClick={(event) => this.props.addAttribute({name: '', value: ''})}>
						Lisää attribuutti
					</button>
				</Col>
				{attributeList}
			</Row>
		);
	}
}