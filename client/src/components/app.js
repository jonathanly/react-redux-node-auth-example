import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './Header';
import Feature from './Feature';
import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp';
import SignOut from './Auth/SignOut';
import RequireAuth from './Auth/RequireAuth';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route path='/signin' component={SignIn} />
          <Route path='/signup' component={SignUp} />
          <Route path='/signout' component={SignOut} />
          <Route path='/feature' component={RequireAuth(Feature)} />
        </Switch>
      </div>
    );
  }
}

export default App;
