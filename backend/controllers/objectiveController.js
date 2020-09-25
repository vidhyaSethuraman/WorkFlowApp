
const { type } = require('os');
const CompanyObjective = require('../models/companyObjective');
const DepartmentObjective = require('../models/departmentObjectives');
const Employee = require('../models/employee');

module.exports.company_post = async (req, res) => {
   // console.log("adding company objective");
    const { objective } = req.body;
    //console.log("comapny post " + objective);
    try 
    {
      const co = await CompanyObjective.create({description: objective});
      //console.log(co);

      res.status(201).json({action:"success"});
    }
    catch(err) 
    {
      console.log(err);
      res.status(400).json({ err });
    }
     
  }

  module.exports.company_get = async (req, res) => {
   // console.log("sending company objective");
    try 
    {
      const co = await CompanyObjective.find();
     // console.log(co);

      res.status(201).json({objectiveList : co});
    }
    catch(err) 
    {
      console.log(err);
      res.status(400).json({ err });
    }
     
  }



  module.exports.department_post = async (req, res) => {
    //console.log("adding dept objective");
    const { objective ,selectedDept } = req.body;
    //console.log("dept post " + objective);
   // console.log("dept " + selectedDept);
    try 
    {
      const dobj = await DepartmentObjective.create({description: objective, dept_id: selectedDept});

      //console.log(dobj);

      res.status(201).json({action:"success"});
    }
    catch(err) 
    {
      console.log(err);
      res.status(400).json({ err });
    }
     
  }

  module.exports.department_get = async (req, res) => {
    //console.log("sending dept objective");
    try 
    {
      const co = await DepartmentObjective.find();
     // console.log(co);

      res.status(201).json({objectiveList : co});
    }
    catch(err) 
    {
      console.log(err);
      res.status(400).json({ err });
    }
     
  }


  module.exports.department_link = async (req, res) => {
    
    const { coid ,doid,dept_id } = req.body;
   // console.log(typeof(coid));
   // console.log(typeof(doid));
    depts =['', 'HR'  ,'Developemnt','QA','Networks'];
    var dept_id_int = parseInt(dept_id, 10);
    var dept_name = depts[dept_id_int];
    try 
    {

      let coo = await CompanyObjective.findById(coid);

      let arr=coo.key_results;
     
     
      let  dobj = await DepartmentObjective.findByIdAndUpdate(doid, {company_objective_id:coid})
     // console.log(dobj);
      let kr ={dept_obj_id: dobj._id, kr_description: dobj.description ,dept_name}
      arr.push(kr);
      const cobj = await CompanyObjective.findByIdAndUpdate(coid,{key_results:arr});
     // console.log(cobj);

      res.status(201).json({action:"success"});
    }
    catch(err) 
    {
      console.log(err);
      res.status(400).json({ err });
    }
     
  }


  module.exports.employee_add = async (req,res) => {
    const {name ,designation,dept_id,mobileno,email,password} = req.body;
    try{

      let emp = await Employee.create({name,dept_id,designation,mobileno,email,password});
     // console.log(emp);

    }
    catch(err)
    {
      console.log(err);
    }

    res.status(201).json({action:"success"});
  }


  module.exports.employee_get = async (req,res) => {
    const {name ,designation,dept_id,mobileno,email,password} = req.body;
    console.log("emp gettt");
    try{

      var emp = await Employee.find();
      //console.log(emp);

    }
    catch(err)
    {
      console.log(err);
    }

    res.status(201).json({emp:emp});
  }


  module.exports.employee_update_obj = async (req,res) => {
    const {objective , emp_id} = req.body;
    try{
      let emp = Employee.findById(emp_id);
      emp_kr = emp.objectives;
      let kr= {objective}
      emp_kr.push()
    }
    catch(err)
    {
      console.log(err);
    }
  }

  
  module.exports.employee_link = async (req, res) => {
    
    //const { eoid ,doid} = req.body;
    console.log("In employee link")
    console.log(req.body);
    const { eoid ,doid} = req.body;
    console.log(eoid);
    console.log(doid);
    
    try 
    {
      
      let doo = await DepartmentObjective.findById(doid);
      eoo = await Employee.findById(eoid);
      let arr=doo.key_results;
      arr.push({employee_id:eoid,employee_name:eoo.name});
      console.log("doo push")
      console.log(arr);
       
      const dobj = await DepartmentObjective.findByIdAndUpdate(doid,{key_results:arr});

    

      eoo = await Employee.findById(eoid);
      empname =eoo.name;
      let arr1 = eoo.objectives;
      arr1.push({dept_obj_id:doid,description: dobj.description});
      console.log("eoo push")
      console.log(arr1)
      const emp = Employee.findByIdAndUpdate(eoid,{objectives:arr1});
      console.log("heyyy" + empname);
      res.status(201).json({action:"success"});
    }
    catch(err) 
    {
      console.log(err);
      res.status(400).json({ err });
    }
     
  }