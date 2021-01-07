var userLoginModel = require('../data/user');

var userLoginController = {
    get: (params, callback) => {
        userLoginModel.get(params, function (err, data) {
            callback(err, data)
        });
    },

    registerUser: (params, callback) => {
        userLoginModel.registerUser(params, function (err, data) {
            callback(err, data)
        });
    }
}
module.exports = userLoginController;