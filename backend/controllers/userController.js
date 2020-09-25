
const jwt = require('jsonwebtoken');
const { compare } = require("bcrypt");
const User = require('../models/user');


const maxAge = 1 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'workflow app', {
    expiresIn: maxAge
  });
};



const handleErrors = (err) => {

  //console.log(err.message);
  var errors = { email: '', password: '' };

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}



module.exports.signup_post = async (req, res) => {
  console.log("SIGNUPP");
  const { email, password } = req.body;
  console.log(email,password);
  try 
  {
    const user = await User.create({ email, password });
    //set cookie with jwt 
    const token = createToken(user._id);
    //console.log(token);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });

    //res.status(201).json({ customer: customer._id });
    res.status(201).json({action:"success"});
  }
  catch(err) 
  {
    console.log(err);
    const errors = handleErrors(err);
    console.log("errors are " + errors);
   console.log(errors);
    res.status(400).json({ errors });
  }
   
}


module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  console.log(email,password);

  try {
    const user = await User.login(email, password);
    console.log("Customer in controller" + user);

    //set cookie with jwt
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: false, maxAge: maxAge * 1000 });

    console.log("user exists");
    res.status(201).json({action:"success"});
  } 
  catch (err) {
    const errors = handleErrors(err);
    console.log("errors are " + errors);
    console.log(errors);
    res.status(400).json({ errors });
  }
  
}





