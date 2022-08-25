const router = require('express').Router();
const notesRoute = require('../apiRoutes/notesRoute');
//use notesRoute

router.use(notesRoute);

module.exports = router;