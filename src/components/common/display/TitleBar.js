import React from 'react';

export default class TitleBar extends React.Component {

	constructor(props) {
		super(props);
	}


	render() {
		return(
			<div className="title-bar">
				{this.props.title}
			</div>
		)
	}
}	