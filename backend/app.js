const express = require('express');
const mongoose = require('mongoose');
const appRoutes = require('./routes/appRoutes');
const cookieParser = require('cookie-parser');


const app = express();

app.use(cookieParser())
app.use(express.json());




mongoose.connect('mongodb+srv://test:test@cluster0.stu4f.mongodb.net/WorkFlowApp?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true ,useCreateIndex: true })
.then(function(){
    try{
    app.listen(8000);
    }
    catch(err)
    {
        console.log(err);
    }
})
.catch(function(err){console.log(err);});


app.use(appRoutes);


/*const express = require('express');
//const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const userController = require('./controllers/userController.js');
const { authorize, checkUser } = require('./middleware/authorization.js');

const app = express();

var bodyparser = require('body-parser');

var urlep = bodyparser.urlencoded({extended : false});

app.use(cookieParser())
app.use('/public' , express.static('public'));
app.use(express.json());



//app.set('view engine' ,'ejs');

app.listen(8000);


app.post('/signup',urlep,userController.signup_post);


app.get('/data' ,authorize,function(req,res)
{
    res.status(201).json({data:"successfull"});
});*/