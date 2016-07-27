'use strict'

var tg = require ('../tg'),
	Db = require('../connection/Db'),
	keyboard = require('../lib/keyboard'),
	texts = require('../texts.json');

var siteAlreadyRemoved = function($){
	var options = {
		chat_id: $._from._id,
		message_id: $._message._messageId,
	};
	tg.api.editMessageText(texts.siteAlredyRemoved, options);
}

var siteRemoved = function($, status){
	var options = {
		chat_id: $._from._id,
		message_id: $._message._messageId,
		disable_web_page_preview: true,
		reply_markup: keyboard.getRestoreButton($._message._text, status)
	};
	tg.api.editMessageText($._message._text + texts.removed, options);
}

module.exports.siteRemoved = siteRemoved;
module.exports.siteAlreadyRemoved = siteAlreadyRemoved;