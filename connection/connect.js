'use strict'

var mongoose = require('mongoose'),
	SiteModel = require('./models/Site'),
	dburl = require('../config.json').dburl;

mongoose.Promise = global.Promise;

var findValue = function(arr, value){
	for(var i = 0, l = arr.length; i < l; i++) {
		if(arr[i] === value) return i;
	}
	return -1;
}

var Db = function(){

	this.connection = mongoose.createConnection(dburl);
	this.Site = SiteModel(this.connection);

	this.addSite = (chatId, address) => {

		return this.Site.findOne({path: address}).exec()
			.then(site => {
				if(!site) {
					site = new this.Site({path: address});
					return site.save();
				}
			})
			.then(()=>this.Site.findOne({path: address}).exec())
			.then(site=>{
				if(findValue(site.users, chatId) !== -1) return;
				return this.Site.update({path: address},{$push: {"users": chatId}});
			});

	};

	this.removeSite = (chatId, address) => {
		return this.Site.update({path: address}, {$pull: {users: chatId}})
			.then(()=>this.Site.findOne({path: address}).exec())
			.then(site =>{
				if(!site) return;
				if(!site.users || !site.users[0]) return this.Site.remove({path: address});
			});
	};

	this.getFavorites = chatId => {
		return this.Site.find({users:chatId}).exec()
			.then(sites => {
				var favorites = [];
				for(var i = 0, l = sites.length; i < l; i++){
					favorites.push(sites[i].path);
				}
				return favorites;
			});
	};

	this.getUsers = address => {
		return this.Site.findOne({path: address}).exec()
			.then(site => site.users);
	};
}

module.exports = Db;