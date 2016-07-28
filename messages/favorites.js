'use strict'

var texts = require('../texts.json'),
    keyboard = require('../lib/keyboard'),
    commonMessages = require('./common');

var empty = function($){
	var text = texts.favoritesIsEmpty;
	keyboard.getStartButtons($.chatId)
		.then(keyboard => {
			var options = {reply_markup: keyboard};
			return $.sendMessage(text, options);
		})
		.catch(err => {
			commonMessages($, 'error');
			console.error(err);
		});
}

var favorites = function($, favorites){
	for(var i = 0, l = favorites.length; i < l; i++){
		var options = {
			disable_web_page_preview: true,
			reply_markup: keyboard.getFavInlineButtons(favorites[i])
		}
		$.sendMessage(favorites[i], options)
	}
}

module.exports.empty = empty;
module.exports.favorites = favorites;