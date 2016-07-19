var mongoose = require('mongoose');
var SiteModel = require('./models/Site');
var dburl = require('../config.json').dburl;

mongoose.Promise = global.Promise;

var findValue = function(arr, value){
	for(var i = 0, l = arr.length; i < l; i++) {
		if(arr[i] === value) return i;
	}
	return -1;
}

var Db = function(dburl){

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
			})

	}

	this.removeSite = (chatId, address) => {
		return this.Site.update({path: address}, {$pull: {users: chatId}})
			.then(()=>this.Site.findOne({path: address}).exec())
			.then(site =>{
				if(!site) return;
				if(!site.users || !site.users[0]) return this.Site.remove({path: address});
			})
	}

}
/*
var db1 = new Db(dburl);
db1.addSite(1,'yandex.com')
	.then(()=>db1.addSite(1,'google.com'))
	.then(()=>db1.addSite(1,'vk.com'))
	.then(()=>db1.removeSite(1,'google.com'))
	.then(()=>db1.removeSite(1,'vk.com'))
	.then(() => db1.connection.close())
	.catch(err=>{
		db1.connection.close();
		console.error(err);
	})


var db2 = new Db(dburl);
db2.addSite(8,'yandex.com')
	.then(()=>db2.addSite(8,'google.com'))
	.then(()=>db2.addSite(8,'vk.com'))
	.then(()=>db2.removeSite(8,'google.com'))
	.then(()=>db2.removeSite(8,'vk.com'))
	.then(()=>db2.removeSite(8,'yandex.com'))
	.then(() => db2.connection.close())
	.catch(err=>{
		db2.connection.close();
		console.error(err);
	})


var db3 = new Db(dburl);
db3.addSite(1,'yandex.com')
	.then(()=>db3.addSite(7,'google.com'))
	.then(()=>db3.addSite(7,'vk.com'))
	.then(()=>db3.removeSite(8,'yandex.com'))
	.then(() => db3.connection.close())
	.catch(err=>{
		db3.connection.close();
		console.error(err);
	})

*/