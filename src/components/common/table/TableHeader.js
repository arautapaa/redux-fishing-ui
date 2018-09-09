import React from 'react';

export default class TableHeader extends React.Component {

	constructor(props) {
		super(props);

		this.handleHeaderClick = this.handleHeaderClick.bind(this);

		this.active = false;

		this.props.fields.map((item) => {
	      if(item.key == this.props.activeField.field) {
	        this.active = true;
	      }
	    });
	}

	handleHeaderClick(item) {
		let desc = item.desc;

		if(item.active) {
			this.active = !this.active;
		} else {
			this.active = item.desc;
		}

		this.props.handleHeaderClick(item.key, this.active);
	}

	render() {
		const headers = this.props.fields.map((item, index) => {
			let className = null;
			let icon = null;

			if(this.props.activeField.field == item.key) {
				className = "active-sort";
				const iconName = this.props.activeField.desc ? "icon icon-down" : "icon icon-up";
				icon = <span className={iconName}></span>
			}

			return <th className={className} key={index} onClick={() => { this.handleHeaderClick(item)}}>{item.header}{icon}</th>
		})

		return(
			<tr>
				{headers}
			</tr>
		)
	}
}