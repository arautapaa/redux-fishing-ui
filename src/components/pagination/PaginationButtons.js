import React from 'react';
import { Pagination } from 'react-bootstrap';

export default class PaginationButtons extends React.Component {

	render() {
		let pages = parseInt(this.props.total / this.props.pageSize);

		if(this.props.total % this.props.pageSize != 0) {
			pages += 1;
		}
 
		return(
			<Pagination activePage={this.props.selectedPage} onSelect={(item) => {this.props.onSelect(item) }} prev next first last ellipsis bsSize="large" items={pages} maxButtons={3}/>
		)	
	}
}