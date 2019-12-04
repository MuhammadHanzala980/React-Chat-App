import React, { useState } from 'react'
import firebase from 'firebase'
import './style.css'

function SignUp() {
    const [fName, setFName] = useState('')
    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')

    function getValue(e) {
        if (e.target.name === 'fName') {
            setFName(e.target.value)
        }
        else if (e.target.name === 'email') {
            setEmail(e.target.value)
        }
        else if (e.target.name === 'pwd') {
            setPwd(e.target.value)
        }
    }

    function rigister() {
        console.log(fName, email, pwd)
        let db = firebase.database().ref('/')
        firebase.auth().createUserWithEmailAndPassword(email, pwd)
            .then((success) => {
                console.log(success, '======> Account Create')
                let userId = firebase.auth().currentUser.uid;
                let userObj = {
                    fName, email, pwd, userId
                }
                firebase.database().ref('users/' + userId).set(userObj)
                    .then((sucs) => {
                        firebase.auth().signInWithEmailAndPassword(email, pwd)
                            .then((success) => {
                                console.log(success, '======> Loged In')
                                db.child('/users/' + success.user.uid).on('value', (currentUser) => {
                                    userObj = currentUser.val()
                                    userObj.id = currentUser.key
                                    console.log(userObj)
                                    var userData = JSON.stringify(userObj)
                                    localStorage.setItem("userData", userData)
                                })
                            })
                    })
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage)
                alert(errorCode)
            });
    }

    return (
        <div className='form' >
            <div className='inputFeilds' >
                
                <input value={fName} name='fName' onChange={getValue} type='text' placeholder='Full Name' />
                <input value={email} type='email' name='email' onChange={getValue} placeholder='Email' />
                <input value={pwd} type='password' name='pwd' onChange={getValue} placeholder='password' />
                <div className='btn'>
                    <button onClick={rigister}>SignUp</button>
                </div>
            </div>
        </div>
    )
}

export default () => {
    return (
        <div>
            <SignUp />
        </div>
    )
}