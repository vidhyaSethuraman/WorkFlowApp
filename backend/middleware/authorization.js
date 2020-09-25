const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
//const Customer = require("../models/customers");

const authorize = (req, res, next) => {
 console.log("in authooooo");
  const token = req.cookies.jwt;
  console.log(token);
  if (token) {
    jwt.verify(token, 'workflow app', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.auth = null;
        //res.redirect('/login');
        next();
      } else {
        console.log("DEcoded token " + decodedToken);
        res.locals.auth = true;
        next();
      }
    });
  } else {
    res.locals.auth = null;
    //res.redirect('/login');
    next();
  }
};


const checkUser = async(req, res, next) => {
  console.log("IN CHECK USERRRRRRRR");
  const token = req.cookies.jwt;
  
  if (token) {
    jwt.verify(token, 'workflow app', async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await Customer.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { authorize, checkUser };