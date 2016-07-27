'use strict'

var texts = require('../texts'),
	keyboard = require('../lib/keyboard'),
	tg = require('../tg');

var getText = function(type){
	if(type === 'start') return texts.start;
	if(type === 'success') return texts.success;
	if(type === 'other') return texts.otherWise;
	if(!type === 'error') console.error('Неизвестный тип сообщения в messages/common');
	return texts.error;
}

var common = function($, type){
	var text = getText(type);
	var chatId = $.chatId || $._from._id;
	keyboard.getStartButtons(chatId)
		.then((keyboard) => {
			var options = {reply_markup: keyboard};
			tg.api.sendMessage(chatId, text, options); 
		})
		.catch(err => {
			commonMessages($, 'error');
			console.error(err);
		});
}

module.exports = common;