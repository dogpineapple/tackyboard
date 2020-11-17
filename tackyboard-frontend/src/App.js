import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import NavBar from './NavBar';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(localStorage.getItem("user_id") ? true : false);

  console.log("isloggedin...", isLoggedIn);

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
        <Routes setLoggedIn={setLoggedIn} />
      </BrowserRouter>
    </div>
  );
}


export default App;
