import React, { useState,useEffect } from 'react';
import M from 'materialize-css';
import '../styles/company.css';
import DeptTab from './deptTab';


function Department() {

    const [deptTab,setdeptTab]= useState(null);
    const[dept,setdept]=useState(null);

    const deptarmentList =['', 'HR'  ,'Developemnt','QA','Networks'];

    useEffect(()=>{
    M.AutoInit();  
    },[])

    const handlesel = dept_id =>
    {
        let dept_id_integer = parseInt(dept_id);
        setdept(<span>- {deptarmentList[dept_id_integer]}</span>);
        setdeptTab(<DeptTab dept_id={dept_id_integer} />);
    }

    return (
        <>
            <div class="row">
                <div class="col l9"><h4>  Department Objectives {dept} </h4></div>
                <div class="col l3">
                    <div class="input-field col s12">
                        <select onChange={(e)=>{handlesel(e.target.value)}} >
                            <option  value="" disabled selected>Department</option>
                            <option value="1" >HR</option>
                            <option value="2" >Development</option>
                            <option value="3" >QA</option>
                            <option value="4" >Networks</option>
                        </select>
                    </div>
                </div>
            </div>
            {deptTab}

        </>
    );

}

export default Department;