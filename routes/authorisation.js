/** routing autoryzacji */

/** importy bibliotek */
const express = require('express');
/** walidator */
const { body } = require('express-validator/check');

const User = require('../models/user'); 

/** init router-a */
const router = express.Router();

/** router test auth */
const authController = require('../controllers/authorisation');

/** middleware dla sprawdzenia czy użytkownik zalogowany */
const isAuth =  require('../middleware/is-auth');

/** pod adresem localhost:8080/auth/test */
router.get('/test', authController.getTestData);

/** pod adresem localhost:8080/auth/register */
router.post('/register',[
    
    body('email').isEmail().withMessage('Proszę podać prawidłowy email!')
    .custom((value, {req}) => {
        return User.findOne({
            where: {
                email:value,
            }
        }).then(user => {
            if(!!user) {
                return Promise.reject('Podany email, już istnieje.');
            }
        });
    }),
    body('password').trim().isLength({min: 5}).withMessage('Proszę podać hasło, mające więcej niż 5 znaków'),
    body('last_name').trim().not().isEmpty().withMessage('Nazwisko wymagane'),
    body('first_name').trim().not().isEmpty().withMessage('Imię wymagane'),
    body('role_id').trim().not().isEmpty().withMessage('Wymagana rola użytkownika'),    

], authController.addUser);

/** logowanie  */
router.post('/login', 
[
    body('password').trim().not().isEmpty().withMessage('Proszę podać hasło!'),
    body('email').isEmail().withMessage('Proszę podać prawidłowy email!')
    .custom((value, {req}) => {
        return User.find({
            where: {
                email:value,
            }
        }).then(user => {
            if(!user) {
                return Promise.reject('Podany użytkownik nie istnieje w bazie !');
            }
        });
    })
] 
, authController.login);

/** reset hasła */
router.post('/resetPassword', [
    body('email').isEmail().withMessage('Proszę podać prawidłowy email!')
    .custom((value, {req}) => {
        return User.find({
            where: {
                email:value,
            }
        }).then(user => {
            if(!user) {
                return Promise.reject('Podany użytkownik nie istnieje w bazie !');
            }
        });
    })
] , authController.resetPassword);


/** sprawdza czy użytkownk jest zalogowany */
router.get('/isAuth', isAuth, authController.isAuth);

/** export router-a */
module.exports = router;