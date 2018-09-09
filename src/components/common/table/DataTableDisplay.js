import React from 'react';

import TableBody from './TableBody';
import TableHeader from './TableHeader';

export default class DataTableDisplay extends React.Component {

	render() {
		return(
			<table className="data-table table table-bordered">
				<thead>
					<TableHeader  activeField={this.props.activeField}  fields={this.props.fields} handleHeaderClick={this.props.handleHeaderClick}/>
				</thead>
				<TableBody fields={this.props.fields} objects={this.props.objects} />
			</table>
		)
	}
}

