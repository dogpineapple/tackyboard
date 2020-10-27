import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Homepage from '../Homepage';
import Taskboard from '../Board';
import Login from '../Login';
import SignUp from '../SignUp';

function Routes() {
  return (
    <Switch>
      <Route path="/taskboard/:boardid">
        <Taskboard />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route>
        <SignUp />
      </Route>
      <Route path="/demo">
        <Taskboard />
      </Route>
      <Route>
        <Homepage />
      </Route>
    </Switch>
  )
}

export default Routes;