/** Testowy GET  */

const User = require('../models/user');

exports.getTestData =  (req, res, next) => {
    res.status(200).json({info: "Test GET "});
};

exports.addUser = (req, res, next) => {
    var body = req.body;
    const user =  new User(
        body['role_id'],
        body['last_name'],
        body['first_name'],
        body['email'],
        body['password'],
        );
    user.register();
};