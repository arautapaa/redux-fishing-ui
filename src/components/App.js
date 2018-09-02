import React from "react";
import "../stylesheets/main.scss";


import Header from './common/Header';
import Footer from './common/Footer';

// app component
export default class App extends React.Component {
  // render
  render() {
    return(
	    <section>
	    	<Header />
	    	{this.props.children}
	    </section>
    );
  }
}
