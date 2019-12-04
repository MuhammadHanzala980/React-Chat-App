import './App.css';
import firebase from 'firebase';
import history from './history';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import Users from './Component/Users/users';
import Chate from './Component/chate/chate';
import SignIn from './Component/Rigister/signIn';
import SignUp from './Component/Rigister/signUp';
import { simpleAction } from './store/action'
import { Router, Route, Redirect } from "react-router-dom";
// import Auth from './Component/Rigister/signIn'
var firebaseConfig = {
  apiKey: "AIzaSyDy-aiJXge7qUprO4ymfH-sUZGflFTs8N0",
  authDomain: "chate-app-41aad.firebaseapp.com",
  databaseURL: "https://chate-app-41aad.firebaseio.com",
  projectId: "chate-app-41aad",
  storageBucket: "chate-app-41aad.appspot.com",
  messagingSenderId: "315460346800",
  appId: "1:315460346800:web:57cb03b0929fa04e452c75",
  measurementId: "G-L9F66BJ77C"
};
firebase.initializeApp(firebaseConfig);


const Auth = {
  isAuthenticated: false,

  authenticate() {
    this.isAuthenticated = true
  },
  logout() {
    this.isAuthenticated = false
  },
  getAuth() {
    return this.isAuthenticated
  }
}

const login = () => (
  Auth.authenticate()
)

var auth = JSON.parse(localStorage.getItem("userData"))
const AuthChack = (auth) => {
  if (auth !== null) {
    login()
  }
}

const PrivetRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => Auth.getAuth() ? <Component /> : <Redirect to={{
    pathname: "/"
  }} />} />
)


class App extends Component {
  constructor() {
    super()
    this.state = {
    }

  }
  a() {
    this.props.simpleAction( '66666' )
  }
  
  render() {
    console.log(this.props.state)
    AuthChack()
    const isLoggedIn = auth
    return (
      <div className="App">
        <div className='nave'>
          <div className='logo'><a>LOGO</a></div>
          {isLoggedIn ? (
            <div className='link'>
              <ul className='list'>
                <li><a>HOME</a></li>
                <li onClick={() => { history.push('/chat') }} ><a>CHATE</a></li>
                <li><a>SETTING</a></li>
                <li onClick={() => { history.push('/users') }} ><a>FRIENDS</a></li>
              </ul>
            </div>
          ) : (
              <div className='signInForm'>
                <SignIn history={history} />
              </div>
            )}
        </div>
        <Router history={history} >
          <div>
            <Route path='/' exact component={SignUp} />
            <Route path='/chat' component={Chate} />
            <Route path='/users' component={Users} />
          </div>
        </Router>
        {/* {isLoggedIn ? (<Chate />) : (<SignUp />)} */}
        <button onClick={this.a.bind(this)}>Poaoaoaoaao</button>
      </div>
    );
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     simpleAction: (id) => {
//       dispatch(simpleAction(id))
//     }
//   }
// }
const mapDispatchToProps = (dispatch) => {
  return ({
    simpleAction: (user) => {
      console.log(user)
      dispatch(simpleAction(user))
    }
  })
};

const mapStateToProps = (state) => {
  return {
    state
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
