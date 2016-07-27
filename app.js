'use strict'

const Telegram = require('telegram-node-bot'),
	tg = require('./tg'),
	TelegramBaseController = Telegram.TelegramBaseController,
	TelegramBaseCallbackQueryController = Telegram.TelegramBaseCallbackQueryController;

require('./lib/autoPing')();

tg.router
    .when(['/start'], new (require('./routes/startController')(TelegramBaseController))())
    .when(['Добавить сайт'], new (require('./routes/addSiteController')(TelegramBaseController))())
    .when(['Избранное'], new (require('./routes/favoritesController')(TelegramBaseController))())
    .otherwise(new (require('./routes/otherwiseController')(TelegramBaseController))())
    .callbackQuery(new (require('./routes/сallbackQueryController')(TelegramBaseCallbackQueryController))());