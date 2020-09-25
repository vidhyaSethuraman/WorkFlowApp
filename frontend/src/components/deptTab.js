import React, { useState,useEffect } from 'react';
import axios from 'axios';
import M from 'materialize-css';
import '../styles/company.css';
import { useSelector,useDispatch } from 'react-redux'


function DeptTab(props) {

    const [objective,setObjective] = useState(null);          // new objective
    const [CoObjective, setCoObjective] = useState(null);       // list of C Objectives
    const [DoObjective, setDoObjective] = useState(null);   // list of D objectives
    const [empList,setEmpList] = useState(null);            //list of employees
    const [selectedDept,setSelectedDept] =useState(null);
    const [depatmentObjectives,setDO]=useState(null);      //particular dept objectives jsx
    const [Link_CID, setLinkcid] = useState(null);
    const [Link_DID, setLinkdid] = useState(null);
    const [Link_EID, setLinkeid] = useState(null);


    const deptarmentList =['', 'HR'  ,'Developemnt','QA','Networks'];
    var cobj_store = useSelector(state => state.companyObjectives);
    var dobj_store = useSelector(state => state.deptObjectives);
    var emp_store = useSelector(state => state.employeeDetails);

    const dispatch = useDispatch();

    useEffect(()=>{
        M.AutoInit();  
        console.log("auto init");
    },[])

    useEffect(()=>{
    cobj_store.then((res)=>{
        console.log(res);
        cosetter(res);
    })
    },[cobj_store]);

    const cosetter = async (a) =>{
    console.log("cosetter");
    console.log(a);
    setCoObjective(a);
    }
    
    useEffect(()=>{
    dobj_store.then((res)=>{
        //console.log(res);
        dosetter(res);
        //getObjList(props.dept_id);
    })
    },[dobj_store]);

    const dosetter = async (a) =>{
    console.log("dosetter");
    console.log(a);
    setDoObjective(a);
    }

    useEffect(()=>{
    emp_store.then((res)=>{
        console.log(res);
        empsetter(res);
    })
    },[emp_store]);

    const empsetter = async (a) =>{
    console.log("dosetter");
    console.log(a);
    setEmpList(a);
    }




    const HandleAddObj = () => 
    {
        var results = axios.post('/objectives/department/add',{
            objective,selectedDept:props.dept_id
         })
         .then((response) => {
             //console.log("successssss");
             //console.log(response);
             setObjective('');
             dispatch({type:'REFRESH_DEPT'})
             //getObjList(props.dept_id);
         })
         .catch((err) => {
             console.log(err);
         });
    }


    useEffect(()=>{
        console.log("rerendering")
        console.log(DoObjective);
        let objdata= DoObjective;
        var dept_id = props.dept_id 
        if(objdata!=null)
        {
            setSelectedDept(dept_id);
            var objlistArray =[];
            for( let i =0 ;i< objdata.length ;i++)
            {
            let objd= objdata[i];
            if(dept_id==objd.dept_id)
            {
                var assigne =null;
               
                if(objd.key_results.length!=0)
                {
                  assigne = <p>Assignee : {objd.key_results[0].employee_name}</p>;
                }
                
                let objlist = 
                    <div className="card" onClick={()=>{console.log("hi");setLinkdid(objd._id)} }>
                        <div class="card-content">
                            <div class="card-title">
                                {objd.description}
                                <span className="badge">
                                    <a data-target="modal2" class="waves-effect waves-light btn-small btn-floating green hehe modal-trigger"><i class=" material-icons">add</i></a>&nbsp;
                                    <a data-target="modal1" class="waves-effect waves-light btn-small btn-floating amber hehe modal-trigger"><i class=" material-icons">link</i></a>&nbsp;
                                    <a class="waves-effect waves-light btn-small red darken-1 btn-floating hehe"><i class=" material-icons">delete</i></a>
                                </span>
                            </div>
                            {assigne}
                        </div>
                    </div> ;
                objlistArray.push(objlist);
                console.log(objlistArray);
            }
            }
            
        setDO(objlistArray);
       }   

       
    },[DoObjective,props.dept_id])


    const companyObjListSetter = () =>{
        var x = CoObjective;
        var objc=[]
        if(x!=null)
        {
        for(let i=0 ;i<x.length;i++)
        {
          let co = x[i];
          //console.log(co);
          let cod = <p>
          <label>
            <input name="group1" type="radio" value={co._id}/>
              <span>{co.description}</span>
          </label>
        </p>
        objc.push(cod);
        }
      }
        //console.log(objc);
        return objc;
    }

    const empListSetter = () =>{
        var x = empList;
        var objc=[]
        if(x!=null)
        {
        for(let i=0 ;i<x.length;i++)
        {
          let co = x[i];
          if(co.dept_id==props.dept_id)
          {
          //console.log(co);
          let cod = 
            <p>
                <label>
                    <input name="group1" type="radio" value={co._id}/>
                    <span>{co.name} - {co.designation}</span>
                </label>
            </p>
            objc.push(cod);
          }
        }
      }
        //console.log(objc);
        return objc;
    }

    const handleLinkBtn = () =>{
       var results = axios.post('/objectives/department/link',{
          coid:Link_CID,doid:Link_DID,dept_id:selectedDept
       })
       .then(function (response) {
           //console.log("successssss");
           //console.log(response);
           dispatch({type:'REFRESH'});
          
       })
       .catch((err) => {
           let error =err.response.data.errors;
           console.log(error);
       });
       
       
    }

    const handleAABtn = () =>{
       var results = axios.post('/objectives/employee/link',{
          eoid:Link_EID,doid:Link_DID
       })
       .then(function (response) {
           //console.log(response);
           dispatch({type:'REFRESH_DEPT'});
       })
       .catch((err) => {
           let error =err.response.data.errors;
           console.log(error);
       });
       
      
       
    }

    return (
        <>
            
            <div class="row">
                <div class="col l9 "><input type="text" value={objective}  onChange={(e)=>{setObjective(e.target.value)}}  /></div>
                <div class="col l3 "> <button className="btn amber darken-1 add-obj-btn" onClick={()=>{HandleAddObj()}}>Add Objective</button></div>
            </div>
            {depatmentObjectives}

            <div id="modal1" class="modal">
              <div class="modal-content" onChange={(e)=>{setLinkcid(e.target.value)}}>
              {companyObjListSetter()}
              </div>
              <div class="modal-footer">
                <a href="#!" className="modal-close green btn" onClick={()=>{handleLinkBtn()}}>Okay</a>
              </div>
            </div>

            <div id="modal2" class="modal">
              <div class="modal-content" onChange={(e)=>{setLinkeid(e.target.value)}}>
              {empListSetter()}
              </div>
              <div class="modal-footer">
                <a href="#!" className="modal-close green btn" onClick={()=>{handleAABtn()}} >Okay</a>
              </div>
            </div>
        </>
    );

}

export default DeptTab;