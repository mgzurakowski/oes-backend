/** Testowy GET  */

/**  
 *  wysylanie kod potwierdzenia w addUser
 *  wpisanie kodu potwierdzenia w confirmUser
 *  wysyłanie resetu hasla generowanie nowego resetPassword - email przychodzi nowe w resetPassword
 */
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

/** rejestracja użytkownika, wysyłanie mail z potwierdzeniem */

exports.addUser = (req, res, next) => {
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
    .then(user => {
        res.status(200).json(
            {
                status: 200,
                message:'Utworzono użytkownika',
                data: {
                    user_id: user.user_id,
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    role_id: user.role_id,
                }
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
                        data: {
                            token: token,
                            userId: loadedUser.user_id.toString()
                        },
                        message: "Zalogowany"
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

/** zmiana hasła po tym jak użytkownik jest zalogowany */
exports.passwordChange = (req, res, next) => {
    let middleWareStatus = req.statusCode;
    if (middleWareStatus == 401) {
        const error =  new Error('Walidacja nie powiodła się, token jest nie ważny!');
        error.statusCode = 401;
        throw error;
    }
}
/** wysyła reset hasła na email*/
exports.sendReset = (req, res, next) => {}
/** ustala nowe hasło  */
exports.passwordReset = (req, res, next) => {}


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
                data: null,
                message: "Zalogowany"
            }
        );
}


