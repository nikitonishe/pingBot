'use strict'

var mongoose = require('mongoose');
var Schema= mongoose.Schema;

var Site = new Schema({
	path: {type: String, unique: true},
	users: {type: Array},
	status: {type: Number}
})

var SiteModel =  function(connection){
	return SiteModel = connection.model('Site', Site);
}

module.exports = SiteModel;