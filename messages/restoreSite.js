'use strict'

var tg = require('../tg'),
	keyboard = require('../lib/keyboard');

var siteRestored = function($){
	var address = $._message._text.split(' ')[0];
	var options = {
		chat_id: $._from._id,
		message_id: $._message._messageId,
		disable_web_page_preview: true,
		reply_markup: keyboard.getFavInlineButtons(address)
	}
	tg.api.editMessageText(address, options);
}

module.exports = siteRestored;