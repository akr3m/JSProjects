import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom';
import '../css/Login.css'
import {auth} from './firebase'

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const history = useHistory();

    const signIn = (e) => {
        e.preventDefault();

        // firebase login
        auth
            .signInWithEmailAndPassword(email, password)
            .then((auth) => {
                if (auth) {
                    history.push('/')
                }
            }).catch(error => alert(error.message))

    }

    const register = (e) => {
        e.preventDefault();

        // firebase register
        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                console.log(auth);  // successful user auth
                if (auth) {
                    history.push('/')
                }
            }).catch(error => alert(error.message))


    }
    


    return (
        <div className='login' >
            <Link to='/' >
                <img className='login__logo' 
                    src='https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg'  alt='' />
            </Link>

            <div className='login__container' >
                <h1>Sign In</h1>

                <form>
                    <h5>Email: </h5>
                    <input type='text' value={email}  onChange={e => setEmail(e.target.value)} />
                    <h5>Password: </h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} />
                    <button className='login__signinButton' onClick={signIn} type='submit' >Sign In</button>
                    <br />
                    <p>By continuing, you agree to AMAZON CLONE Conditions of Use and Privacy Notice.</p>
                    <br />
                    <button className='login__registerButton' onClick={register} >Create your Amazon Account</button>
                </form>
            </div>
        </div>
    )
}

export default Login
