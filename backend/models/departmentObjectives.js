const { ObjectID } = require('bson');
var mongoose = require('mongoose');

const DepartmentObjectiveSchema = new mongoose.Schema(
    {
        dept_id:{                   //FK  // will be updated on entering details & clicking on "ADD OBJECTIVE" btn in department objectives tab
            type:String
        },
        description: {                   // will be updated on entering details & clicking on "ADD OBJECTIVE" btn in department objectives tab
            type: String
        },
        id:{                       //PK  // will be updated on entering details & clicking on "ADD OBJECTIVE" btn in department objectives tab
            type:String
        },
        company_objective_id:{     //FK // will be updated on entering details  & clicking on "LINK" btn department objectives tab 
            type:String
        },
        key_results: [
            {
                id:{
                    type:String,
                },
                name:{
                    type:String,  
                },
                employee_id:{
                    type:String,
                },
                employee_name:{
                    type:String
                }
            }
        ],
    }
)

const DepartmentObjective = mongoose.model('departmentObjective', DepartmentObjectiveSchema);

module.exports = DepartmentObjective;