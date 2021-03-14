import { Avatar, Button } from '@material-ui/core';
import React from 'react';
import { auth, provider } from './firebase';
import './Login.css';
import { actionTypes } from './reducer';
import { useStateValue } from './StateProvider';

function Login(){

    const [{}, dispatch] = useStateValue();


    const signIn = () => {
        auth.signInWithPopup(provider).then(result => 
            {
                dispatch({
                    type:actionTypes.SET_USER,
                    user:result.user,
                })
            })
        .catch((error) => alert(error.message));
    };
    return (
        <div className="login">
            <div className="login_container">
                <div className="logow">
                </div>
            {/* <img src="whatsapp-logo.png" height="400px" width="400px" alt="Whatsapp"/> */}

            <div className="login_text">
                <h1>Sign in to WhatsApp</h1>
            </div>

            <Button type="submit" onClick={signIn}>
                Sign In with Google
            </Button>
            </div>
        </div>
    );
}

export default Login;