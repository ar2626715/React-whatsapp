import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Login from './Login'
import {BrowserRouter as Router , Switch ,Route } from 'react-router-dom';
import {useStateValue} from './StateProvider'


function App() {

  const [{user}, dispatch] = useStateValue();
  // const [user ,setUser] = useState(null);


  return (


    //Bem naming convention
   <div className="app">
     {!user ? (
       <Login />
     ):(

   <div className="app_body">
     <Router>
     <Sidebar />
       <Switch>
    <Route path="/rooms/:roomID">

     <Chat />
     </Route>


     <Route path='/'>
           <Chat />
           </Route>

     </Switch>

     </Router>
   </div>
   )}

   <div className="footer">
     Designed by AvEnGeR
   </div>
   </div>


    /* // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div> */
  );
}

export default App;
