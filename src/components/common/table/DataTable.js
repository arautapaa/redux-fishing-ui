import React from 'react';

import TableHeader from './TableHeader';
import TableBody from './TableBody';
import { MAX_SIZE } from '../../../constants/paging';
import PaginationButtons from '../../pagination/PaginationButtons';
import DataTableDisplay from './DataTableDisplay';

export default class DataTable extends React.Component {

	constructor(props) {
		super(props);

		const objects = []

		for(var i = 0; i < MAX_SIZE; i++) {
			objects.push(this.props.objects[i]);
		}

		this.state = {
			objects : objects,
			selectedPage : 1
		}

		this.updatePage = this.updatePage.bind(this);
		this.handleHeaderClick = this.handleHeaderClick.bind(this);
	}

	componentDidUpdate(prevProps) {
		if(prevProps.objects != this.props.objects) {
			this.updatePage(1);
		}
	}

	updatePage(pageNumber) {

		const objects = [];

		const start = (pageNumber - 1) * MAX_SIZE;
		const end = start + MAX_SIZE;

		for(var i = start; i < end && i < this.props.objects.length; i++) {
			objects.push(this.props.objects[i]);
		}

		this.setState({
			objects : objects,
			selectedPage : pageNumber
		});
	}

	handleHeaderClick(key, desc) {
		this.props.handleHeaderClick(key, desc);
	}

	render() {
		let pagination = null;

		if(this.props.objects.length > MAX_SIZE) {
			pagination = <PaginationButtons pageSize={MAX_SIZE} total={this.props.objects.length} onSelect={this.updatePage} selectedPage={this.state.selectedPage} />
		}

		return(
			<div>
				<div className="table-responsive" >
					<DataTableDisplay  activeField={this.props.activeField} fields={this.props.fields} handleHeaderClick={this.handleHeaderClick} objects={this.state.objects}/>
				</div>
				<div className="pull-right">
					{pagination}
				</div>
			</div>
		)
	}
}