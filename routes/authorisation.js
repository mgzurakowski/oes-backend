/** routing autoryzacji */

/** importy bibliotek */
const express = require('express');

/**init router-a */
const router = express.Router();

/** router test auth */
const authController = require('../controllers/authorisation');
router.get('/test', authController.getTestData);


/** export router-a */
module.exports = router;