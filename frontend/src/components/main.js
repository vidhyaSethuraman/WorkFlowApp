import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';

import logo from '../images/logo.jpeg';
import banner1 from '../images/banner1.jpeg';


function Main() {
  return (
    <>
    <nav className="nav wrapper black">
        <div className="container">
            <a href="#" class="brand-logo"><img src={logo} height="34px" width="35px" style={{marginBottom:"-4px"}} />&nbsp;Work Hive</a>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
                <li><a >OverView</a></li>
                <li><a >Pricing</a></li>
                <li><a >Features</a></li>
                <li><a >Customer</a></li>
                <li><a href="/login" class="btn amber darken-1">Login</a></li> 
            </ul>
        </div>
    </nav>
    <br/>
    <br/>
    <div class="container">
        <div class="row">
            <div class="col l5">
                <br/><br/>
                <h3>Work Hive</h3>
                <h6>Work Hive is a business workflow software that helps innovative companies to reduce chaos by using our cloud workflow software. </h6>
                <h6>Among the available workflow management tools Work Hiveis the #1 workflow software and most simplest and easy to use software that helps you to create workflow online. If you are looking to create workflow app to automate your business process, look no further than Work Hive.</h6>
                <a class="btn amber darken-1">Get Started</a>
            </div>
            <div class="col l6">
                <img src={banner1} />
            </div>
        </div>
    </div>


    </>
  );
}

export default Main;