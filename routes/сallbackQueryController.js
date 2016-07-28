'use strict'

var	Db = require('../connection/Db'),
	removeSiteMessages = require('../messages/removeSite'),
	restoreSiteMessages = require('../messages/restoreSite'),
	commonMessages = require('../messages/common');

var removeSite = function($){
	var address = $._message._text,
		chatId = $._from._id,
		status;
	var db = new Db();
	db.getSiteStatus(address)
		.then(statusCode => {
			if(!statusCode && statusCode !== 0) {
				removeSiteMessages.siteAlreadyRemoved($);
				return Promise.reject();
			}
			status = statusCode;
			return db.removeSite($._from._id, $._message._text)
		})
		.then(res => {
			db.connection.close();
			return removeSiteMessages.siteRemoved($, status);
		})
		.catch(err => {
			db.connection.close();
			if(err){
				console.error(err);
				commonMessages($, 'error');
			}
		})
}

var restoreSite = function($){
	var data = $._data.split('~'),
		address = data[1],
		status = +data[2],
		db = new Db();

	db.addSite($._from._id, address, status)
		.then(res => {
			db.connection.close();
			return restoreSiteMessages($);
		})
		.catch(err => {
			db.connection.close();
			console.error(err);
			commonMessages($, 'error');
		})
}

var callbackQueryController = function(TelegramBaseCallbackQueryController){
	return class CallbackQueryController extends TelegramBaseCallbackQueryController{
		handle($){
			if($._data === 'removeSite') removeSite($);
			if($._data.match(/restore/)) restoreSite($);
		}
	}
}

module.exports = callbackQueryController;