import React from 'react';

import Slider from 'react-rangeslider';
// To include the default styles
import 'react-rangeslider/lib/index.css';
export default class WeightSlider extends React.Component {

	constructor(props) {
		super(props);

		this.handleChangeStart = this.handleChangeStart.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleChangeComplete = this.handleChangeComplete.bind(this);
	}

	handleChangeStart() {

	};

  handleChange(value) {
    this.props.onValueChange(value, this.props.type);
  };

  handleChangeComplete () {

  }

  componentDidUpdate(prevProps) {
  	if(prevProps.initialValue != this.props.initialValue) {
  		this.setState({
  			value : this.props.initialValue
  		})
  	}
  }

  render () {
    return (

      <div className='slider'>
        <strong className="dark-text">{this.props.label}</strong>
        <Slider
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
          value={this.props.value}
          onChangeStart={this.handleChangeStart}
          onChange={this.handleChange}
          onChangeComplete={this.handleChangeComplete}
        />
        <div className='value'>{this.props.value}</div>
      </div>
    )
  }

}	