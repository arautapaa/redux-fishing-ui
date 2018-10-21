import React from 'react';

import { Grid, Row, Col } from 'react-bootstrap';
import Header from '../common/Header';
import LoadingIndicator from '../common/LoadingIndicator';
import DraughtAnalyzer from '../../api/analyze';
import LineChartAnalysis from '../analysis/LineChartAnalysis';

export default class DraughtAnalyzePage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading : true,
			analysis : {

			}
		}

		this.rangeSort = this.rangeSort.bind(this);
		this.numberSort = this.numberSort.bind(this);
		this.directionSort = this.directionSort.bind(this);
	}

	rangeSort(a, b) {
		const aSplit = a.label.split("-")[0];
		const bSplit = b.label.split("-")[0];

		return parseInt(aSplit) - parseInt(bSplit);
	}

	numberSort(a, b) {
		return a.label - b.label;
	}

	directionSort(a, b) {
		const map = {
			"Pohjoinen" : 0,
			"Koillinen" : 45,
			"Itä" : 90,
			"Kaakko" : 135,
			"Etelä" : 180,
			"Lounas" : 225,
			"Länsi" : 270,
			"Luode" : 315
		}

		return map[a] - map[b];
	}

	componentDidMount() {
 		DraughtAnalyzer.getDraughtAnalysis().then((response) => {
 			this.setState({
 				loading : false,
 				analysis : response
 			})
 		})	
  	}

	render() {
		let component = <LoadingIndicator />

		if(!this.state.loading) {
			component = <div>
				<LineChartAnalysis 
				data={this.state.analysis.byTemp} 
				sortHandler={this.rangeSort} 
				labelName="Lämpötila"
				headerName="Lämpötila" />
				<LineChartAnalysis 
				data={this.state.analysis.weight}
				sortHandler={this.rangeSort}
				labelName="Paino"
				headerName="Paino" />
				<LineChartAnalysis 
				data={this.state.analysis.byMonth}
				sortHandler={this.numberSort}
				labelName="Kuukausi"
				headerName="Kuukausi" 
				labeltype="numeric"/>
				<LineChartAnalysis 
				data={this.state.analysis.byTime}
				sortHandler={this.numberSort}
				labelName="Tunti"
				headerName="Tunti"
				labeltype="numeric" />
				<LineChartAnalysis 
				data={this.state.analysis.windD}
				sortHandler={this.directionSort}
				labelName="Ilmansuunta"
				headerName="Ilmansuunta" 
				/>
			</div>
		}

		return(
			<div>
			    <Header {...this.props} />
				{component}
			</div>
		)
	}
}