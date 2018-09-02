import React from 'react';

import { Row, Col } from 'react-bootstrap';
import TitleBar from '../common/display/TitleBar';
import WeightSlider from './WeightSlider';

export default class WeightSelection extends React.Component {

	constructor(props) {
		super(props);

		this.onValueChange = this.onValueChange.bind(this);
		this.getTotal = this.getTotal.bind(this);
		this.getInitialValue = this.getInitialValue.bind(this);
	
		this.state = {
			kg : this.getInitialValue('kg'),
			g : this.getInitialValue('g')
		};
	}

	onValueChange(value, type) {
		this.setState({
			[type] : value
		});
	}

	componentDidUpdate(prevProps){
		if(prevProps.selectedFish != this.props.selectedFish) {
			this.setState({
				kg : this.getInitialValue('kg'),
				g : this.getInitialValue('g')
			})
		}
	}

	getTotal() {
		return this.state.kg * 1000 + this.state.g;
	}

	getInitialValue(type) {
		const defaultWeight = this.props.selectedFish.additionalAttributes.weight.default

		if(type == 'g') {
			return defaultWeight - (parseInt(defaultWeight / 1000) * 1000);
		} else {
			return parseInt(defaultWeight / 1000);
		}
	}

	render() {

		let min = this.props.selectedFish ? this.props.selectedFish.additionalAttributes.weight.range.min : 0;
		let max = this.props.selectedFish ? this.props.selectedFish.additionalAttributes.weight.range.max : 10;
		let step = this.props.selectedFish ? this.props.selectedFish.additionalAttributes.weight.range.steps : 1;


		return(
			<Row>
				<Col sm={12}>
					<TitleBar title={this.props.title}/>
					<WeightSlider onValueChange={this.onValueChange} initialValue={this.getInitialValue('kg')} type="kg" min={min} max={max} step={1} label="Kg: "/>
					<WeightSlider onValueChange={this.onValueChange} initialValue={this.getInitialValue('g')} min={0} max={1000} step={step} type="g" label="G: "/>
					<div className="col-sm-2 col-sm-offset-5 text-center">
						<button className="btn btn-lg btn-info">
							{this.getTotal()}g
						</button>
					</div>
				</Col>
			</Row>
		)
	}
}	