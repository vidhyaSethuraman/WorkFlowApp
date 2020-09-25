var mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');


const UserSchema = new mongoose.Schema(
    {

        name: {
            type: String
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
        }

    }
)

UserSchema.pre('save', async function(next){
    this.password= await bcrypt.hash(this.password,10);
    next();
})

UserSchema.statics.login = async function(email, password) {
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

const User = mongoose.model('user', UserSchema);

module.exports = User;