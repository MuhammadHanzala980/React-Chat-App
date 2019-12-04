import React, { useState } from 'react'
import firebase from 'firebase';
import history from'../../history'
import './sign.css';
export default (props) => {
    console.log(props)
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

    function signInFun() {
        let userObj = { email, pwd }

        let db = firebase.database().ref('/')
        firebase.auth().signInWithEmailAndPassword(email, pwd).then((success) => {
            db.child('/users/' + success.user.uid).on('value', (currentUser) => {
                userObj = currentUser.val()
                userObj.id = currentUser.key
                var userData = JSON.stringify(userObj)
                localStorage.setItem("userData", userData)
                    history.push("/chat")
            })
        }).catch((error) => {
            // var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage)
        });

        // history.push("/chat");
    }

    return (
        <div className='form1'>
            <div className='inputFeilds1' >
                <input type='text' name='email' value={email} onChange={getValue} placeholder='Inter Your Email ' />
                <input type='password' name='pwd' value={pwd} onChange={getValue} placeholder='Inter Your Password' />
                <button onClick={signInFun} >Sign In</button>
            </div>
        </div>
    )
}

// export default () => {
//     return (
//         <div>
//             <SignIn />
//         </div>
//     )
// }