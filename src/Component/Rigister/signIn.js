import firebase from 'firebase';
import history from '../../history';
import { connect } from 'react-redux';
import { authChack, isLogedin } from '../../store/action'
import React, { useState } from 'react';
import './sign.css';
function SignIn(props) {
    console.log(props.item)
    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')
    function getValue(e) {
        if (e.target.name === 'email') {
            setEmail(e.target.value)
        }
        else if (e.target.name === 'pwd') {
            setPwd(e.target.value)
        }
    }

    function signInFun(ev) {
        ev.preventDefault()
        let userObj = { email, pwd }
        let db = firebase.database().ref('/')
        firebase.auth().signInWithEmailAndPassword(email, pwd).then((success) => {
            db.child('/users/' + success.user.uid).on('value', (currentUser) => {
                userObj = currentUser.val()
                userObj.id = currentUser.key
                var userData = JSON.stringify(userObj)
                localStorage.setItem("userData", userData)
                props.item.authenticate()
                props.isLogedin(true)
                history.push("/chat")

            })
        }).catch((error) => {
            var errorMessage = error.message;
            alert(errorMessage)
        });
    }

    return (
        <div className='form1'>
            <div className='inputFeilds1' >
                <form onSubmit={signInFun}>
                    <input type='text' name='email' value={email} onChange={getValue} placeholder='Inter Your Email ' />
                    <input type='password' name='pwd' value={pwd} onChange={getValue} placeholder='Inter Your Password' />
                    <button onClick={signInFun} >Sign In</button>
                </form>
            </div>
        </div>
    )
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
        item: state.auth
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);