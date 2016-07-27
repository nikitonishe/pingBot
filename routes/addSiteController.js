'use strict'

var Db = require('../connection/Db'),
	ping = require('../lib/ping'),
	commonMessages = require('../messages/common'),
	newStatusMessages = require('../messages/newStatus'),
	addSiteMessages = require('../messages/addSite');

var waitAddress = function wait($){
	$.waitForRequest
		.then($ => {
			if($.message._text === 'Отменить') return addSiteMessages.endOperation($, 'cancel');
			if(!$.message._text.match(/http:\/\/|https:\/\//)) $.message._text = 'http://'+ $.message._text;
			return ping($.message._text);
		})
		.then(status =>{
			if(status.error){
				addSiteMessages.incorrectAddress($);
				return wait($);
			}
			var db = new Db;
			return db.addSite($.chatId, status.address, status.code)
				.then(res => {
					db.connection.close();
					if(!res) return addSiteMessages.endOperation($, 'siteAlreadyExist');
					commonMessages($, 'success');
					return newStatusMessages($.chatId, status, true);
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