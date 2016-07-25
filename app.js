'use strict'
var Telegram = require('telegram-node-bot'),
	token = require('./config.json').token;

var TelegramBaseController = Telegram.TelegramBaseController,
	bot = new Telegram.Telegram(token);

bot.router
    .when(['/start'], new (require('./routes/startController')(TelegramBaseController))())
    .when(['Добавить сайт'], new (require('./routes/addSiteController')(TelegramBaseController))())
    .when(['Избранное'], new (require('./routes/favoritesController')(TelegramBaseController))());