'use strict'

var texts = require('../texts.json'),
    Keyboard = require('../lib/Keyboard');

var favoritesToInlineKeyboard = function($, favorites){
	var options = {
		disable_web_page_preview: true
	}
	return {
	    layout: 2, 
	    method: 'sendMessage',
	    params: [favorites, options],
	    menu: [
	        {
	            text: texts.removeButton,
	            callback: (callbackQuery, message) => require('../inlineCallBacks/removeSite')($, callbackQuery, message)
	        },
	        {
	            text: texts.openButton,
	            url: favorites
	        }
	    ]
	}
}

var empty = function($){
	var text = texts.favoritesIsEmpty;
	var keyboard = new Keyboard();
	keyboard.getStartButtons($.chatId)
		.then(keyboard => {
			var options = {reply_markup: keyboard};
			$.sendMessage(text, options);
		})
		.catch(err => console.error(err));
}

var favorites = function($, favorites){
	for(var i = 0, l = favorites.length; i < l; i++){
		var inlineKeyboard = favoritesToInlineKeyboard($, favorites[i])
		$.runInlineMenu(inlineKeyboard)
	}
}

module.exports.empty = empty;
module.exports.favorites = favorites;