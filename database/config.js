
'use strict';
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mern_calendar',{
    useUnifiedTopology: true
    });

module.exports = mongoose;
