'use strict'
var Db = require('../connection/connect'),
	ping = require('../lib/ping'),
	commonMessages = require('../messages/common'),
	addSiteMessages = require('../messages/addSite');

var waitAddress = function wait($){
	var db = new Db;
	$.waitForRequest
		.then($ => {
			if($.message._text === 'Отменить') return addSiteMessages.endOperation($, 'cancel');
			return ping($.chatId, $.message._text)
		})
		.then(status =>{
			if(status.error){
				addSiteMessages.incorrectAddress($);
				return wait($);
			}
			return db.addSite($.chatId, $.message._text)
				.then(res => {
					db.connection.close();
					if(!res) return addSiteMessages.endOperation($, 'siteAlreadyExist');
					commonMessages($, 'success');
				}).then(status => {
					console.log(status);
				})
		})
		.catch(err => {
			db.connection.close();
			console.error(err);
			commonMessages($, 'error')
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