'use strict'

var texts = require('../texts'),
	Keyboard = require('../lib/Keyboard');

var getText = function(type){
	if(type === 'start') return texts.start;
	if(type === 'success') return texts.success;
	if(!type === 'error') console.error('Неизвестный тип сообщения в messages/common')
	return texts.error;
}

var common = function($, type){
	var keyboard = new Keyboard();
	var text = getText(type);

	keyboard.getStartButtons($.chatId)
		.then((keyboard) => {
			var options = {reply_markup: keyboard};
			$.sendMessage(text, options); 
		})
		.catch(err =>  console.error(err));
}

module.exports = common;