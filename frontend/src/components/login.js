import React ,{useState} from 'react';
import axios from 'axios';
import '../styles/login.css';
import 'materialize-css/dist/css/materialize.min.css';

function Login(){

    const [email , SetEmail ] = useState('');
    const [password , SetPassword ] = useState('');
    const [emailError , SetEmailError ] = useState('');
    const [passwordError , SetPasswordError ] = useState('');

    const LoginHandler = () => {
       
        var results = axios.post('/login',{
            email,
            password
        })
        .then(function (response) {
            console.log("successssss");
            console.log(response);
            window.location.href="/dashboard";
            
        })
        .catch((err) => {
            let error =err.response.data.errors;
            console.log("error is " + error);
            SetEmailError(error.email);
            SetPasswordError(error.password);
        });
    }

    return(
        
        <div class="container center-align">

            <div className="login-form-wfa">
                <h4 class="white-text">Login</h4>
                <div className="input-field">
                    <input className="white-text" type="email" value={email} onChange={(e)=>SetEmail(e.target.value)} />
                    <label className="amber-text darken-1" for="email">Email</label>
                </div>
                <div className="input-field">
                    <input className="white-text" type="password" value={password} onChange={(e)=>SetPassword(e.target.value)} />
                    <label className="amber-text darken-1" for="password">Password</label>
                </div>
                <br/>
                <button className="btn btn-wfa amber darken-1" onClick={() => LoginHandler()}>Log In</button>
                <br/><br/>
                <p className="white-text login-ask">Don't have an account? <a className="amber-text darken-1"  onClick={()=> {window.location.href="/signup"}}>Sign Up</a> </p>
            </div>
            
        </div>
        
    )
}
export default Login;