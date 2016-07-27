'use strict'
var tg = require('../tg.js'),
	texts = require('../texts.json');

var newStatus = function(chatId, status, firstTime){
	var text = status.address;
	if(!firstTime) text += texts.newStatus;
	if(firstTime) text += texts.firstTimeNewStatus;
	text += status.code + ' ' + status.message;
	tg.api.sendMessage(chatId, text, {disable_web_page_preview: true});
}

module.exports = newStatus;