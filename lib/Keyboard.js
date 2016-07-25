var Db = require ('../connection/connect'),
	texts = require('../texts.json'),
	commonMessages = require('../messages/common');


var Keyboard = function(){
	this.keyboard = [];
	this.resize_keyboard = true;

	this.addButton = (text) => {
		this.keyboard.push([{text: text}]);
	}

	this.getStartButtons = (chatId) => {
		var db = new Db;

		return db.getFavorites(chatId)
			.then(favorites => {
				db.connection.close();
				if(favorites && favorites[0]) this.addButton(texts.favoritesButton);
				this.addButton(texts.addSiteButton);
				return JSON.stringify(this);
			})
			.catch(err => {
				db.connection.close();
				if(err) console.error(err);
				commonMessages($, 'error');
			})
	}
}

module.exports = Keyboard;