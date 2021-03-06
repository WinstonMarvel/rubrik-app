let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let config = require('../config.json');

let db = mongoose.connect(config.db.url,{useNewUrlParser: true});

let postRoutes = require('./posts')(router, mongoose);
let loginRoutes = require('../routes/login')(router, mongoose);
let passwordResetRoutes = require('../routes/passwordReset')(router, mongoose);
let toExcel = require('./export')(router, mongoose);
let reports = require('./reports')(router, mongoose);


router.use('/public/', express.static('public'));

module.exports = router;