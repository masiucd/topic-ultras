import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppLayout from './components/styled/AppLayout';
import Home from './pages/Home';
import { Container } from './components/styled/Grid';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/styled/Alert';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/hoc/PrivateRoute';

import store from './store';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

export default function App() {
  useEffect(() => {
    // store.dispatch, method from the store
    store.dispatch(loadUser());
  }, []);

  return (
    <>
      <Provider store={store}>
        <Router>
          <AppLayout>
            <Route path="/" exact component={Home} />
            <Switch>
              <Container>
                <Alert />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Container>
            </Switch>
          </AppLayout>
        </Router>
      </Provider>
    </>
  );
}
