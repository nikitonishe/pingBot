'use strict'

var Db = require('../connection/Db'),
	newStatusMessage = require('../messages/newStatus'),
	interval = require('../config').interval,
	ping = require('./ping'); 

var pingSite = function(site){
	var db;
	ping(site.path)
		.then(status => {
			if(status.code === site.status) return Promise.reject();			
			for(var i = 0, l = site.users.length; i < l; i++){
				newStatusMessage(site.users[i], status);
			}
			db = new Db();	
			return db.updateStatus(site.path, status.code);
		})
		.then(() => db.connection.close())
		.catch(err => {
			if(db) db.connection.close();
			if(err) consol.error(err);
		})
}

var autoPing = function(){
	(function ap(){
		var db = new Db()
		db.getSites()
			.then(sites =>{
				db.connection.close();
				for(var i = 0, l = sites.length; i < l; i++){
					pingSite(sites[i]);
				}
				return setTimeout(ap, +interval);
			})
			.catch(err => {
				console.error(err);
				db.connection.close();
			})
	})()
}

module.exports = autoPing