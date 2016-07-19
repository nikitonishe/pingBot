var TelegramBot = require('node-telegram-bot-api'),
	Router = require('./router/Router'),
	config = require('./config');

var token = config.token,
	options = {polling: true};
var bot = new TelegramBot(token, options),
	router =  new Router(bot);

bot.on('text', function(message){
	var chatId = message.chat.id,
        textMes = message.text;

    router.route(textMes, chatId);
})