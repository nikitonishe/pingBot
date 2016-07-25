'use strict'
var Db = require('../connection/connect'),
	removeSiteMessages = require('../messages/removeSite'),
	commonMessages = require('../messages/common');

var removeSite = function($, callbackQuery, message){
	var chatId = callbackQuery._from._id,
		text = callbackQuery._message._text,
		messageId = callbackQuery._message._messageId,
		db = new Db();
	db.removeSite(chatId, text)
		.then(res => {
			db.connection.close();
			if(!res) return removeSiteMessage.siteDoesNotExist($, messageId);
			removeSiteMessages.siteRemoved($, messageId);
		})
		.catch(err => {
			db.connection.close();
			console.error(err);
			commonMessages($, 'error');
		})
}

module.exports = removeSite;