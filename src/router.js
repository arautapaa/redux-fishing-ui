import React from "react";
import { BrowserRouter, Route, IndexRoute, Switch } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';
import App from "./components/App";
import DraughtListPage from "./components/pages/DraughtListPage";
import DraughtAddPage from "./components/pages/DraughtAddPage";
import LoginPage from './components/pages/LoginPage';
import NotFound from "./components/NotFound";

// build the router
const router = (
  <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
	<div>
		 <ProtectedRoute path="/" exact component={DraughtListPage}/>	
		 <ProtectedRoute path="/fishes" component={DraughtListPage}/>
		 <ProtectedRoute path="/new" component={DraughtAddPage}/>
		 <Route path="/login" component={LoginPage}/>
		 <Route path="*" component={NotFound}/>
	</div>
  </BrowserRouter>
);

// export
export { router };
