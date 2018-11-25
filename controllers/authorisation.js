/** Testowy GET  */


const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

/** test api */
exports.getTestData =  (req, res, next) => {
    res.status(200).json(
        {
            status: 200,
            info: "Połączenie GET ustalone"
        }
    );
};

/** akcja wykonywana po dodaniu użytkownika */

exports.addUser = (req, res, next) => {
    // todo make validation
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        const error =  new Error('Walidacja nie powiodła się');
        error.statusCode = 401;
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

/** akcja wykonywana przy logowaniu użytkownika */

exports.login = (req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        const error =  new Error('Walidacja nie powiodła się');
        error.statusCode = 401;
        error.data = errors.array();
        throw error;
    }

    const email = req.body.email;
    const password = req.body.password;

    let loadedUser;
    User.find({ where: {email:email} })
    /** pobranie user-a */
    .then(
        /** srawdzenie czy instnieje w bazie danych  */
        user => {
            if(!user){
                const error = new Error('Podany użytkownik nie istnieje w bazie danych.');
                error.statusCode = 401;
                throw error;
            }
            loadedUser = user;
            return bcrypt.compare(password, user.password);
        })
        //** sprawdzenie czy haslo jest poprawne */
        .then(isEqual => {
    
            if(!isEqual) {
                const error =  new Error('Błędne hasło');
                error.statusCode = 401;
                throw error;
            }

            const token = jwt.sign(
            {
                email: loadedUser.email,
                userId :loadedUser.user_id.toString()
            },
            'somesupersecretsecret',
            {
                expiresIn: '1d'
            }
        );
        loadedUser.updateAttributes({'authToken' : token}).then(
            ()=>
            {
                res.status(200).json(
                    {
                        status: 200,
                        token: token,
                        userId: loadedUser.user_id.toString()
                    });

            });
                        

            
        })
        .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
}


/**
 * wysyła reset hasła na email
 */
exports.sendReset = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        const error =  new Error('Walidacja nie powiodła się');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
}

exports.passwordReset = (req, res, next) => {

}
/**  */
exports.sendConfirm = (req, res, next) => {

}

exports.acconuntConfirmed = (req, res, next) => {

}

exports.passwordChange = (req, res, next) => {

}

/**
 * sprawdzenie, czy użytkownik jest zalogowany
 */
exports.isAuth = (req, res, next) => {
    let middleWareStatus = req.statusCode;
    if (middleWareStatus == 401) {
        const error =  new Error('Walidacja nie powiodła się, token jest nie ważny!');
        error.statusCode = 401;
        throw error;
    }
        
        res.status(200).json(
            {
                status: 200,
                info: "Zalogowany"
            }
        );
        


}

exports.passwordChange = (req, res, next) => {

}
