var mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema(
    {
        name: {
            type: String
        },
        id:{
            type:String
        },
        employees:{
            type:Array
        },
        dept_head_id{
            type:String
        }
    }
)

const Department = mongoose.model('department', DepartmentSchema);

module.exports = Department;