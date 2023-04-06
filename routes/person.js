const exprees = require('express');
const router = exprees.Router();

const { getPersons, createPerson } = require('../controllers/person');

router.get('/getpersons', getPersons);
router.post('/createperson', createPerson);

module.exports = router;