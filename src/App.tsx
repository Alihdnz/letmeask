//import { createContext, useState, useEffect } from 'react';

import  { BrowserRouter ,Route} from "react-router-dom";
import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
//import { auth, signInWithPopup, GoogleAuthProvider} from "./services/firebase"
import {AuthContextProvider} from "./contexts/AuthContext"

//typando o User e o AuthContextType







function App() {

  return (

    
    <BrowserRouter>
   
      
      <AuthContextProvider>
      <Route exact path="/" component={Home}/>

      <Route exact path="/rooms/new" component={NewRoom}/>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App; 
