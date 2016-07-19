var startText = require('../texts').start,
	buttons = JSON.stringify(require('../buttons').favAndAdd);

var sendStart = function(bot, chatId){
	var options = {	
		reply_markup: buttons
	} 
	bot.sendMessage(chatId, startText, options);
}

module.exports = sendStart;