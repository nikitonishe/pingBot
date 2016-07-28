'use strict'

var is = require ('is_js'),
	Db = require('../connection/Db'),
	ping = require('../lib/ping'),
	commonMessages = require('../messages/common'),
	newStatusMessages = require('../messages/newStatus'),
	addSiteMessages = require('../messages/addSite');

var waitAddress = function wait($){
	var db,
		address,
		status;
	return $.waitForRequest
		.then($ => {
			if($.message._text === 'Отменить'){
				addSiteMessages.endOperation($, 'cancel');
				return Promise.reject();
			}
			if(!$.message._text.match(/http:\/\/|https:\/\//)) address = 'http://'+ $.message._text;
			if(is.not.url(address)) {
				addSiteMessages.incorrectAddress($);
				wait($);
				return Promise.reject();
			}
			db = new Db;
			return db.getSite(address);	
		})
		.then(site => {
			if(site) {
				addSiteMessages.endOperation($, 'siteAlreadyExist');
				return Promise.reject();
			}
			addSiteMessages.wait($);
			return ping(address)
		})
		.then(newStatus => {
			status = newStatus;
			return db.addSite($.chatId, status.address, status.code);
		})
		.then(res =>{
			db.connection.close();
			commonMessages($, 'success');
			return newStatusMessages($.chatId, status, true);
		})
		.catch(err => {
			if(db) db.connection.close();
			if(err){
				console.error(err);
				commonMessages($, 'error');
			}
		})
}

var addSiteController = function(TelegramBaseController){
	return class AddSiteController extends TelegramBaseController{
		addSiteHandler($){
			addSiteMessages.askSite($);
			waitAddress($)
		}

		get routes(){
			return{
				'Добавить сайт': 'addSiteHandler'
			}
		}
	}
}

module.exports = addSiteController;