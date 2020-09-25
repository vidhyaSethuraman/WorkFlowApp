var mongoose = require('mongoose');

const CompanyObjectiveSchema = new mongoose.Schema(
    {
        description: {                  // will be updated on entering details & clicking on "ADD OBJECTIVE" btn in company objectives tab
            type: String      
        },

        id:{                     // PK  // will be updated on entering details & clicking on "ADD OBJECTIVE" btn in company objectives tab
            type:String       
        },

        key_results: [
            {
                dept_obj_id:{
                    type:String,
                },
                kr_description:{
                    type:String,  
                },
                dept_name:{
                    type:String,
                }
            }
        ],                
            
              
    }
)

const CompanyObjective = mongoose.model('CompanyObjective', CompanyObjectiveSchema);

module.exports = CompanyObjective;