/** routing autoryzacji */

/** importy bibliotek */
const express = require('express');


/** init router-a */
const router = express.Router();

/** router test auth */
const authController = require('../controllers/authorisation');

/** pod adresem localhost:8080/auth/test */
router.get('/test', authController.getTestData);

/** pod adresem localhost:8080/auth/register */
router.post('/register', authController.addUser);

/** export router-a */
module.exports = router;