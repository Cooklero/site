require('dotenv').config()
const msyql = require('mysql');
const urlDB = 'mysql://ubc3mef4mis17fso:cz291PRvLMJuqnlk7229@bes74qefgjkoatftztph-mysql.services.clever-cloud.com:3306/bes74qefgjkoatftztph'

const connection = msyql.createConnection(urlDB)
module.exports = connection;