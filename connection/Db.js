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

	this.addSite = (chatId, address, status) => {

		return this.Site.findOne({path: address}).exec()
			.then(site => {
				if(!site) {
					site = new this.Site({path: address, status: status});
					return site.save();
				}
			})
			.then(()=>this.Site.findOne({path: address}).exec())
			.then(site=>{
				if(findValue(site.users, chatId) !== -1) return;
				return this.Site.update({path: address},{$push: {"users": chatId}});
			})
			.catch(err => this.errHandler(err))

	};

	this.removeSite = (chatId, address) => {
		return this.Site.update({path: address}, {$pull: {users: chatId}})
			.then(()=>this.Site.findOne({path: address}).exec())
			.then(site =>{
				if(!site) return;
				if(!site.users || !site.users[0]) return this.Site.remove({path: address});
			})
			.catch(err => this.errHandler(err))
	};

	this.getFavorites = chatId => {
		return this.Site.find({users:chatId}).exec()
			.then(sites => {
				var favorites = [];
				for(var i = 0, l = sites.length; i < l; i++){
					favorites.push(sites[i].path);
				}
				return favorites;
			})
			.catch(err => this.errHandler(err))
	};

	this.getSiteStatus = address => {
		return this.Site.findOne({path: address})
			.then(site => {
				if(!site) return false;
				return site.status
			})
			.catch(err => this.errHandler(err))
	}

	this.getSites = () => this.Site.find().exec().catch(err => this.errHandler(err));

	this.getSite = (address) => this.Site.findOne({path: address}).exec().catch(err => this.errHandler(err));

	this.updateStatus = (address, status) => this.Site.update({path: address},{$set: {status: status}}).catch(err => this.errHandler(err));

	this.errHandler = err => {
		this.connection.close();
		if(err) console.error(err);
	}

}

module.exports = Db;