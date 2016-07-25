'use strict'

var texts = require('../texts.json'),
	Keyboard = require('../lib/Keyboard');

var getText = function(type){
	if(type === 'siteAlreadyExist') return texts.siteAlreadyExist;
	if(type === 'cancel') return texts.cancel;
}

var askSite = function($){
	var keyboard = new Keyboard()
	keyboard.addButton(texts.cancelButton);
	var options = {reply_markup: JSON.stringify(keyboard)};
	$.sendMessage(texts.askSite, options);
};

var endOperation = function($, type){
	var text = getText(type);
	if(!text){
		console.error('Неизвестный тип сообщения в messages/addSite');
		return require('./common')($, 'error');
	}
	
	var keyboard = new Keyboard();
	keyboard.getStartButtons($.chatId)
		.then(keyboard => {
			var options = {reply_markup: keyboard};
			$.sendMessage(text, options);
		})
		.catch(err => console.error(err));
}

module.exports.askSite = askSite;
module.exports.endOperation = endOperation;
