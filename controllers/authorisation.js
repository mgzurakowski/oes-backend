/** Testowy GET  */

const User = require('../models/user');

const { validationResult } = require('express-validator/check');

exports.getTestData =  (req, res, next) => {
    res.status(200).json({info: "Test GET "});
};

/** akcja wykonywana po dodaniu użytkownika */

exports.addUser = (req, res, next) => {
    // todo make validation

    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        const error =  new Error('Validation failed');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    // var body = req.body;
    // const user =  new User(body['role_id'],body['last_name'],body['first_name'],body['email'],body['password']);
    
    user.register();

};