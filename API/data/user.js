const userLogin = require('./userModel');

const userLoginData = {
    //get the user login success
    get: (args, res) => {
        
        userLogin.find({email: args.email, password: args.password}, function (err, data) {
            if (err) return res(err, {'status': 'Error on login access'});

            let result = {};
            let status = "";
            if(data && data.length){
                result = {
                    'username' : data[0].fullname,
                    'user_id': data[0].id
                }
                status = "Login Success";
                return res(err, {'status': status, result});

            } else {
                status="Not a valid user";
                return res(err, {'status': status, result });
            }

        });
    },

    registerUser: (args, res) => {

        userLogin.find({email: args.email ? args.email : ''}, (err, data) => {
            if (err) return res(err, {'status': 'Error on Registration' });

            if(data && data.length){
                return res(err,{'status':"Email already exists"});
            } else {
                let user = new userLogin({
                    fullname: args.fullname,
                    password: args.password,
                    email: args.email
                });

                user.save((err, data) => {
                    if (err)
                        return res(err, {'status': 'Registration Failed'});
                    else
                        return res(err, {'status': 'Registration Success'});
                });
            }

        })
    }

}

module.exports = userLoginData;
