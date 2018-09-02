import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { connect } from "react-redux";
import AuthenticationAPI from '../api/authentication'; 


const ProtectedRoute = ({component: Component, ...rest}) => {

  const {isAuthenticated} = rest;

  return (
    <Route {...rest} render={props => (
      AuthenticationAPI.isAuthenticated() ? (
        <Component {...props}/>
      ) : (
        <Redirect to={{
          pathname: '/login',
          state: {from: props.location}
        }}/>
      )
    )}
    />
  );};

function mapStateToProps(state) {

  return {
    isAuthenticated: state.isAuthenticated || false,
  };
}

export default connect(
    mapStateToProps, null, null, {pure: false}
)(ProtectedRoute);