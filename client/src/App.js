import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './components/LoginForm/Login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './components/RegisterForm/Register';
import UpdatePassword from './components/UpdatePasswordForm/UpdatePassword';
import Home from './components/HomePageForm/Home';

function App() {

  const [activeUser, setActiveUser] = useState({})

  useEffect(() => {
    let user = localStorage.getItem('activeUser')
    if (user) setActiveUser({ _id: user })
  }, [])

  return (
    <section className="App">
      <Router>
        <Routes>
          <Route exact path="/"
            element={
              (activeUser && activeUser._id) ?
                <Home setActiveUser={setActiveUser} /> :
                <Login setActiveUser={setActiveUser} />
            }
          />
          <Route path="/login"
            element={<Login setActiveUser={setActiveUser} />}
          />
          <Route path="/register"
            element={<Register />}
          />
          <Route path="/updatePassword"
            element={<UpdatePassword />}
          />
        </Routes>
      </Router>

      {
        (activeUser && activeUser._id) ?
          "" : (
            <div className='switch-forms'>
              <a href='/login'>LOGIN</a>
              <a href='/register'>REGISTER</a>
              <a href='/updatePassword'>FORGOT PASSWORD</a>
            </div>
          )
      }


    </section>
  );
}

export default App;
