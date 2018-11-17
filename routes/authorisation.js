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

/** pod adresem localhost:8080/auth/test */
router.get('/test', authController.getTestData);

/** pod adresem localhost:8080/auth/register */
router.post('/register',[
    
    body('email').isEmail().withMessage('Proszę podać prawidłowy email!')
    .custom((value, {req}) => {
        return User.find({
            where: {
                email:value,
            }
        }).then(user => {
            if(!!user) {
                return Promise.reject('Podany email, już istnieje.');
            }
        });
    })
    .normalizeEmail(),
    body('password').trim().isLength({min: 5}),
    body('last_name').trim().not().isEmpty(),
    body('first_name').trim().not().isEmpty(),
    body('role_id').trim().not().isEmpty(),    

], authController.addUser);

/** export router-a */
module.exports = router;