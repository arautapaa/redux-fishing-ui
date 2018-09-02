import React from 'react';
import { Provider, connect } from "react-redux";
import { store } from "./store.js";
import { router } from "./router.js";

export class RootProvider extends React.Component {

	render() {
		return(
		  <Provider store={store}>
		   	{router}
		  </Provider>
		)
	}
}

const mapStateToProps = state => ({
  isAuthenticated: state.isAuthenticated
});

export default connect(mapStateToProps)(RootProvider);