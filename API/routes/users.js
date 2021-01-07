const express = require('../node_modules/express');
const router = express.Router();
const userController = require('../controller/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//user register
router.post('/register', (req,res) => {
  userController.registerUser(req.body, (err,data) => {
     if(err) return res.send(err);
     
     res.send(data);
 });
});

//user login
router.post('/login', (req,res) => {
  userController.get(req.body, (err,data) => {
    if(err) return res.send(err);

    res.send(data);
 });
});

module.exports = router;
