const { Router } = require('express');
const userController = require('../controllers/userController.js');
const objectiveController = require('../controllers/objectiveController.js');
const { authorize, checkUser } = require('../middleware/authorization.js');

var bodyparser = require('body-parser');


var urlep = bodyparser.urlencoded({extended : false});
const router = Router();

//user routes
router.post('/signup',urlep,userController.signup_post);
router.post('/login',urlep,userController.login_post);

//objective routes
router.post('/objectives/company/add',urlep,authorize,objectiveController.company_post);
router.get('/objectives/company/get',authorize,objectiveController.company_get);
router.post('/objectives/department/add',urlep,authorize,objectiveController.department_post);
router.get('/objectives/department/get',authorize,objectiveController.department_get);
router.post('/objectives/department/link',authorize,objectiveController.department_link);
router.post('/objectives/employee/add',objectiveController.employee_add);
router.get('/objectives/employee/get',objectiveController.employee_get);
router.post('/objectives/employee/obj/add',objectiveController.employee_update_obj);
router.post('/objectives/employee/link',authorize,objectiveController.employee_link);

module.exports = router;


/*const { Router } = require('express');
const userController = require('../controllers/userController.js');

var bodyparser = require('body-parser');


var urlep = bodyparser.urlencoded({extended : false});
const router = Router();


//user routes
router.get('/login',userController.login_get);
router.get('/signup',userController.signup_get);
router.post('/login',urlep,userController.login_post);
router.post('/signup',urlep,userController.signup_post);*/
