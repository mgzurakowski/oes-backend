/** Testowy GET  */


const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.getTestData =  (req, res, next) => {
    res.status(200).json({info: "Test GET "});
};

/** akcja wykonywana po dodaniu użytkownika */

exports.addUser = (req, res, next) => {
    // todo make validation
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        const error =  new Error('Walidacja nie powiodła się');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }

    var body = req.body;
    const role_id = body['role_id'];
    const last_name  = body['last_name'];
    const first_name = body['first_name'];
    const email = body['email'];
    const plain_password = body['password'];
    
    bcrypt.hash(plain_password, 12)
    .then( hashedPw => {
        const user = new User({
            email: email,
            password: hashedPw,
            first_name: first_name,
            last_name: last_name,
            role_id: role_id
        });
        return user.save();
})
    .then(result => {
        res.status(200).json(
            {
                message:'Utworzono użytkownika',
                status: 200
            }
            );
    }).catch(
        err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
        next(err);
    });





};