import React, { useState } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import '../styles/dashboard.css';

import logo from '../images/logo.jpeg';
import Company from './company';
import Department from './department';



function DashBoard() 
{
    
    const [infoPanel,setInfoPanel] = useState(<><h2 className="container" style={{marginTop:"25px"}}>DashBoard</h2></>);

    return (
        <>
        <nav className="nav wrapper black">
            
                <a href="#" class="brand-logo"><img src={logo} height="34px" width="35px" style={{marginBottom:"-4px",marginLeft:"10px"}} />&nbsp;Work Hive</a>
                <ul id="nav-mobile" class="right hide-on-med-and-down">
                    
                    <li><a class="btn amber darken-1">Logout</a></li> 
                </ul>
            
        </nav>
        <div className="row">
            <div className="col l2 side-bar-nav"> 
                <ul>
                    <h5 className="sidebar-heading"><i class="amber-text darken-1 material-icons">dashboard</i>&nbsp;Dash Board</h5>

                    <h5 className="sidebar-heading"><i class="amber-text darken-1 material-icons">web_asset</i>&nbsp;Admin</h5>
                    

                    <h5 className="sidebar-heading"><i class=" amber-text darken-1 material-icons">insert_chart</i>&nbsp;Objectives</h5>
                    <button class="sidebar-nav-btn" onClick={()=>{setInfoPanel(<Company/>)}} > Company</button>
                    <button class="sidebar-nav-btn" onClick={()=>{setInfoPanel(<Department/>)}} > Department</button>

                    <h5 className="sidebar-heading"><i class=" amber-text darken-1 material-icons">chrome_reader_mode </i>&nbsp;PMS</h5>
                    

                    
                </ul>
            </div>
            <div class="col l1"></div>
            <div className="col l8" style={{height:"1400px"}}>
                {infoPanel}
            </div>
        </div>
        </>
    );
}

export default DashBoard;