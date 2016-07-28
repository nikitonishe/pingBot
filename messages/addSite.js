'use strict'

var texts = require('../texts.json'),
	keyboard = require('../lib/keyboard'),
	commonMessages = require('./common');

var getText = function(type){
	if(type === 'siteAlreadyExist') return texts.siteAlreadyExist;
	if(type === 'cancel') return texts.cancel;
}

var askSite = function($){
	var options = {reply_markup: keyboard.getCancelButton()};
	$.sendMessage(texts.askSite, options);
};

var incorrectAddress = function($){
	$.sendMessage(texts.incorrectAddress);

}

var wait = function ($){
	$.sendMessage(texts.wait, {
		reply_markup: JSON.stringify({
			hide_keyboard: true
		})
	})
}

var endOperation = function($, type){
	var text = getText(type);
	if(!text){
		console.error('Неизвестный тип сообщения в messages/addSite');
		return commonMessages($, 'error');
	}
	keyboard.getStartButtons($.chatId)
		.then(keyboard => {
			var options = {reply_markup: keyboard};
			return $.sendMessage(text, options);
		})
		.catch(err => {
			console.error(err);
			commonMessages($, 'error');
		});
}

module.exports.askSite = askSite;
module.exports.endOperation = endOperation;
module.exports.incorrectAddress = incorrectAddress;
module.exports.wait = wait;