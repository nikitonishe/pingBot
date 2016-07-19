var texts = require('../texts');

var path = './handlers';

var Router = function(bot){
	this.currentUsers = [];

	this.route = (textMes, chatId) => {
		if(textMes === '/start') return require(path+textMes)(bot, chatId);

		if(textMes === 'Добавить сайт'){
			if(!this.currentUsers[chatId] || !this.currentUsers[chatId].action === '/addSite'){
				this.currentUsers[chatId] = {action: '/addSite'};
				return bot.sendMessage(chatId, texts.askSite);
			}
		}

		if(this.currentUsers[chatId] && this.currentUsers[chatId].action === '/addSite'){
			//ДОБАВИТЬ ПРОВЕРКУ АДРЕСА
			require(path + '/addSite')(bot, chatId, textMes);
			return;
		}
	}
}

module.exports = Router;