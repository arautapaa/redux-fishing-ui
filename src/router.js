import React from "react";
import { BrowserRouter, Route, IndexRoute, Switch } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';
import App from "./components/App";
import DraughtListPage from "./components/pages/DraughtListPage";
import DraughtAddPage from "./components/pages/DraughtAddPage";
import LoginPage from './components/pages/LoginPage';
import NotFound from "./components/NotFound";
import DraughtEntryPage from "./components/pages/DraughtEntryPage";

// build the router
const router = (
  <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
	<div>
		<Switch>
		 <ProtectedRoute path="/" exact component={DraughtListPage}/>	
		 <ProtectedRoute path="/fishes" component={DraughtListPage}/>
		 <ProtectedRoute path="/new" component={DraughtAddPage}/>
		 <ProtectedRoute path="/edit/:id" component={DraughtAddPage}/>
		 <ProtectedRoute path="/draught/:id" component={DraughtEntryPage}/>
		 <Route path="/login" component={LoginPage}/>
		 <Route path="*" component={NotFound}/>
		</Switch>
	</div>
  </BrowserRouter>
);

// export
export { router };
