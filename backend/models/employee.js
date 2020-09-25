var mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const EmployeeSchema = new mongoose.Schema(
    {
        name: {
            type: String
        },
        id:{
            type:String
        },
        dept_id: {
            type:String
        },
        designation:{
            type:String
        },
        email: {
            type: String,
            required: [true, 'Please enter an email'],
            unique : true,
            validate: [isEmail,'InValid Email Address' ]
        },
        password: {
            type: String,
            required: [true,'Please enter a password'],
            minlength : [6, 'Minimum Password Length is 6 characters']
        },
        mobileno: {
            type: String,
            minlength: [10,'Enter a valid Phone number']
        },
        objectives: [
            {
                dept_obj_id:{
                    type:String,
                },
                description:{
                    type:String,  
                },
            }
        ],
    }
)


EmployeeSchema.pre('save', async function(next){
    this.password= await bcrypt.hash(this.password,10);
    next();
})

EmployeeSchema.statics.login = async function(email, password) {
    console.log("hiii");
    const user = await this.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw Error('incorrect password');
    }
    throw Error('incorrect email');
};


const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;