import React from 'react';
import { Redirect } from 'react-router-dom';

export default class  extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToHomePage : false
    }
    
    this.redirect = this.redirect.bind(this);
  }

  redirect() {
    this.setState({
      redirectToHomePage : true
    })
  }

  render() {
    const redirect = this.state.redirectToHomePage ? <Redirect to="/" /> : null;

    return(
      <div>
        {redirect}
        <h1 className="dark-text">Rivi tallennettu onnistuneesti</h1>
        <button className="btn btn-primary" onClick={() => this.props.onSelectNew()}>
          Luo uusi rivi samoja tietoja käyttäen
        </button>
        <button className="btn btn-danger" onClick={() => this.redirect()}>
          Siirry pois
        </button>
      </div>
    )
  }
}

