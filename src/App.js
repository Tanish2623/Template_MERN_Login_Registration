import React,{useState , useEffect} from 'react';
import {BrowserRouter, Switch,Route} from 'react-router-dom';
import Home from './Componet/Pages/Home';
import Login from './Componet/auth/Login';
import Register from './Componet/auth/Register';
import Header from './Componet/layouts/Header';
import UserContext from './context/UserContext';
import Axios from 'axios'
import './style.css'
function App() {
  const[userData,setUserData]= useState({
      token : undefined,
      user:undefined
  })

  useEffect(() => {
      const checkLoggedIn = async () =>{
        let token = localStorage.getItem('auth-token');
        if(token == null ){
          localStorage.setItem('auth-token',"");
          token ="";
        }
        const tokenRes= await Axios.post('http://localhost:5000/users/tokenIsValid', null, {headers : { 'x-auth-token': token }});
        if(tokenRes.data){
            const userRes = await Axios.get('http://localhost:5000/users/', {headers : { 'x-auth-token': token }});
            setUserData({
              token,
              user : userRes.data
            })
        }
      }
      checkLoggedIn();
  }, []);
  return (
    <div>
        <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Header/>
          <div className="container">
          <Switch>
            <Route path="/" component={Home} exact={true}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/register" component={Register}></Route>
          </Switch>
          </div>
          </UserContext.Provider>
        </BrowserRouter>
    </div>
  );
}

export default App;
