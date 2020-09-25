import React from 'react';
import { BrowserRouter,Route} from 'react-router-dom';
import SignUp from './components/signup';
import Main from './components/main';
import Login from './components/login';
import DashBoard from './components/dashboard';


function App() {
  return (
    <>
    <BrowserRouter>
      
        <Route exact path="/" component={Main}></Route>
        <Route path='/signup' component={SignUp}></Route>
        <Route path='/login' component={Login}></Route>
        <Route path="/dashboard" component={DashBoard}></Route>
        
    </BrowserRouter>
    </>
  );
}

export default App;