import React from 'react';
import { Switch, Route } from 'react-router-dom';
import About from '../About';
import Homepage from '../Homepage';
import Taskboard from '../Board';
import LoginSignUp from '../LoginSignUp';

function Routes() {
  return (
    <Switch>
      <Route path="/taskboard/:boardid">
        <Taskboard />
      </Route>
      <Route path="/login">
        <LoginSignUp />
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