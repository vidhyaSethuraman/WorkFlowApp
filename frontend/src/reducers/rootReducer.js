import axios from 'axios';



function getCompanyObjectives()
{
    console.log("in  compnay reducer");
    var objdata=null;
    var res = axios.get("/objectives/company/get")
    .then(details=> {
        objdata= details.data.objectiveList;
        return objdata
    }).catch(error=>{
         console.log(error);
    });
    //console.log(res);
    return res;
}


function getEmployeeDetails()
{
    console.log("in emp reducer")
    var empdata=null;
    var res = axios.get("/objectives/employee/get")
    .then(details=> {
        empdata= details.data.emp;
        return empdata
        
    }).catch(error=>{
         console.log(error);
    });
    return res;
}


function getDepartmentObjectives() {
    console.log("in dept reducer")
    var deptdata=null;
    var res = axios.get("/objectives/department/get")
    .then(details=> {
        deptdata= details.data.objectiveList;
        console.log(deptdata);
        return deptdata
        
    }).catch(error=>{
         console.log(error);
    });
    return res;
}


const initState = {
    companyObjectives : getCompanyObjectives(),
    deptObjectives: getDepartmentObjectives(),
    employeeDetails :  getEmployeeDetails()
}

const rootReducer = (state =  initState , action) =>
{
    if(action.type === 'REFRESH')
    {
        console.log("refreshing")
        var refreshedCObj = getCompanyObjectives();
        var refreshedDObj = getDepartmentObjectives();
        return {
            ...state,
            companyObjectives : refreshedCObj,
            deptObjectives:refreshedDObj
        }
    }
    if(action.type === 'REFRESH_DEPT')
    {
        console.log("refreshing dept")
        var refreshedDObj1 = getDepartmentObjectives();
        return {
            ...state,
            deptObjectives:refreshedDObj1
        }
    }
    if(action.type === 'REFRESH_EMP')
    {
        console.log("refreshing emp")
        var employeeDetails1 =  getEmployeeDetails()
        return {
            ...state,
            employeeDetails:employeeDetails1
        }
    }

    return state;

}

export default rootReducer;