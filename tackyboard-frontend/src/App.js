import React, { useState } from 'react';
import { BrowserRouter, useHistory, withRouter } from 'react-router-dom';
import Routes from './Routes';
import NavBar from './NavBar';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn}/>
        <Routes setLoggedIn={setLoggedIn} />
      </BrowserRouter>
    </div>
  );
}


export default App;
