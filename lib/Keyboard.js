'use strict'

var Db = require ('../connection/Db'),
	texts = require('../texts.json');

var getStartButtons = function(chatId){
	var db = new Db;
	return db.getFavorites(chatId)
		.then(favorites => {
			db.connection.close();
			var keyboard = {
				resize_keyboard: true,
				keyboard: [
					[{text: texts.addSiteButton}]
				]
			}

			if(favorites && favorites[0]) keyboard.keyboard.push([{text: texts.favoritesButton}]);
			return JSON.stringify(keyboard);
		})
		.catch(err => {
			db.connection.close();
			console.error(err);
		})
}

var getCancelButton = function(){
	return JSON.stringify({
		resize_keyboard: true,
		keyboard: [
			[{text: texts.cancelButton}]
		]
	})
}

var getFavInlineButtons = function(url){
	return JSON.stringify({
			inline_keyboard : [
				[{text: texts.removeButton, callback_data: 'removeSite'},{text: texts.openButton, url: url}],
			]
		})
}

var getRestoreButton = function(address, status){
	return JSON.stringify({
			inline_keyboard: [
				[{text: texts.restoreButton, callback_data: 'restore~' + address + '~' + status}]
			]
		})
}

module.exports.getStartButtons = getStartButtons;
module.exports.getCancelButton = getCancelButton;
module.exports.getFavInlineButtons = getFavInlineButtons;
module.exports.getRestoreButton = getRestoreButton;