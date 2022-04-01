var express = require('express');
var router = express.Router();
const users = require('../controllers/users')

/* GET users listing. */
router.get('/', users.index);
router.put('/add', users.add);
router.post('/update', users.update);
router.delete('/delete', users.delete);

module.exports = router;
