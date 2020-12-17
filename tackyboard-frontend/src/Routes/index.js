import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Homepage from '../Homepage';
import Taskboard from '../Taskboard';
import Login from '../Login';
import SignUp from '../SignUp';
import Settings from '../Settings';
import TaskboardList from '../TaskboardList';

function Routes({setLoggedIn}) {
  return (
    <Switch>
      <Route path="/tackyboards/:boardName/:boardId">
        <Taskboard />
      </Route>
      <Route path="/tackyboards">
        <TaskboardList />
      </Route>
      <Route path="/users/:uid">
        <Settings />
      </Route>
      <Route path="/login">
        <Login setLoggedIn={setLoggedIn}/>
      </Route>
      <Route path="/signup">
        <SignUp setLoggedIn={setLoggedIn}/>
      </Route>
      {/* <Route path="/demo">
        <Taskboard />
      </Route> */}
      <Route>
        <Homepage />
      </Route>
    </Switch>
  )
}

export default Routes;