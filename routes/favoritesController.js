'use strict'

var Db = require('../connection/connect'),
	favoritesMessages = require('../messages/favorites'),
	commonMessages = require('../messages/common');

var favorites = function($){
	var db = new Db();
	db.getFavorites($.chatId)
		.then(favorites => {
			db.connection.close();
			if(!favorites || !favorites[0]) return favoritesMessages.empty($);
			return favoritesMessages.favorites($, favorites);
		}).catch(err => {
			db.connection.close();
			console.error(err);
			return commonMessages.error($);
		})
}

var favoritesController = function(TelegramBaseController){
	return class FavoritesController extends TelegramBaseController{
		favoritesHandler($){
			favorites($)
		}

		get routes(){
			return {
				'Избранное': 'favoritesHandler'
			}
		}
	}
}

module.exports = favoritesController