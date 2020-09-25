import React, { useState,useEffect } from 'react';
import axios from 'axios';
import M from 'materialize-css';
import '../styles/company.css';
import { useSelector,useDispatch } from 'react-redux'



function Company() {

  const [objective,setObjective] = useState('');
  const [objectiveList,setObjectiveList] = useState(null);
  const [ob,setob] =useState([]);

  var abc = useSelector(state => state.companyObjectives);
  const dispatch = useDispatch()

  const setter = async (a) =>{
    //console.log("a");
    setob(a);
  }

  useEffect(()=>{
    M.AutoInit();  
    
  },[])

  useEffect(()=>{
    abc.then((res)=>{
     // console.log(res);
     setter(res);
    })
  },[abc]);
 
  const HandleAddObj = e =>
  {
      var results = axios.post('/objectives/company/add',{
         objective
      })
      .then(function (response) {
          setObjective('');
          dispatch({type:'REFRESH'});
      })
      .catch((err) => {
          let error =err.response.data.errors;
          console.log(error);
      });
      
  }
  

  const deleteObj = (id) =>{
    console.log(id);
  }
  

 

useEffect(() => {
 
    var objdata= ob;
    var objlistArray =[];
    if(objdata!=null)
    {
        for( let i =0 ;i< objdata.length ;i++)
        {
            let objd= objdata[i];
            let dolist = objd.key_results;
            console.log(dolist);
            var krlist=[]
            for(let j=0;j<dolist.length;j++)
            {
                let kr = 
                <li style={{paddingTop:"2px"}}>
                  {dolist[j].kr_description}
                  <span class="badge amber dept-tag-co black-text">{dolist[j].dept_name}</span>
                </li> ;
                krlist.push(kr);
            }
            let objlist = 
            <div class="card">
              <div class="card-content ">
                <div class="card-title">
                  {objd. description}
                  <span className="badge ">
                    <a class="waves-effect waves-light btn-small red darken-1 dlt-btn">delete</a>
                  </span>
                </div>
                
              </div>
              <div class="card-action  grey lighten-5">
              <ol>{krlist}</ol>
              </div>
            </div>

            objlistArray.push(objlist);
        }
    }
    setObjectiveList(objlistArray);
},[ob]);
  


  return (
    <>
     
        <h4 >Company Objectives</h4>
        <div className="row">
          <div className="col l9"><input value={objective} onChange={(e)=>setObjective(e.target.value)} /></div>
          <div className="col l3 "><button class="btn amber darken-1 add-obj-btn" onClick={()=>{HandleAddObj()}}>Add Objective</button></div>
        </div>
        {objectiveList}
     
    </>
  );
}

export default Company;


