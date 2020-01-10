import './App.css';
import firebase from 'firebase';
import history from './history';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import Chate from './Component/chate/chate';
import Users from './Component/Users/users';
import { authChack, isLogedin } from './store/action';
import SignIn from './Component/Rigister/signIn';
import SignUp from './Component/Rigister/signUp';
import { Router, Route, Redirect } from "react-router-dom";
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
  auth: JSON.parse(localStorage.getItem("userData")),

  authenticate() {
    this.isAuthenticated = true
  },
  logout() {
    this.isAuthenticated = false;
    localStorage.clear()
  },
  getAuth() {
    return this.isAuthenticated;
  }
}

if (Auth.auth !== null) {
  Auth.authenticate()
}

else {
  Auth.logout()
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

  componentDidMount() {
    this.props.authChack(Auth)
  }

  signOut() {
    Auth.logout()
    this.props.isLogedin(false)
    this.props.item.auth.logout()
  }

  render() {
    return (
      <div className="App">
        <div className='nave'>
          <div className='logo'>LOGO</div>
          {
            Auth.isAuthenticated ? (
              <div className='link'>
                <ul className='list'>
                  <li onClick={() => { history.push('/chat') }} ><i className="fas fa-comment"></i></li>
                  <li onClick={() => { history.push('/users') }} ><i className="fas fa-globe-africa"></i></li>
                  <li onClick={this.signOut.bind(this)}><i className="fas fa-sign-out-alt"></i></li>
                  <li><i className="fas fa-cog"></i></li>
                </ul>
                <div className='menu' >
                  <i className="far fa-caret-square-down"></i>
                </div>
              </div>

            ) : (
                <div className='signInForm'>
                  <SignIn history={history} />
                </div>
              )}
        </div>
        <Router history={history} >
          <div>
            <Route path='/' exact component={SignUp}  />
            <PrivetRoute path='/chat' component={Chate} />
            <PrivetRoute path='/users' component={Users} />
          </div>
        </Router>
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return ({
    authChack: (user) => {
      dispatch(authChack(user))
    },
    isLogedin: (e) => {
      dispatch(isLogedin(e))
    }
  })
};

const mapStateToProps = (state) => {
  return {
    item: state
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
