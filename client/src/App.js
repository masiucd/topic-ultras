import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppLayout from './components/styled/AppLayout';
import Home from './pages/Home';
import { Container } from './components/styled/Grid';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/styled/Alert';

export default function App() {
  return (
    <>
      <AppLayout>
        <Route path="/" exact component={Home} />
        <Switch>
          <Container>
            <Alert />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Container>
        </Switch>
      </AppLayout>
    </>
  );
}
