'use strict'
var tg = require('../tg.js'),
	texts = require('../texts.json');

var generateMessage = function(status, firstTime){
	var text = status.address;
	if(status.code === 0) return text += texts.doesNotResponse;
	if(!firstTime) text += texts.newStatus;
	if(firstTime) text += texts.firstTimeNewStatus;
	return text += status.code + ' ' + status.message;
	
}

var newStatus = function(chatId, status, firstTime){
	if(firstTime && !(status.code+'').match(/5[0-9]{2}/) && status.code !== 0) return;
	var text = generateMessage(status, firstTime)
	tg.api.sendMessage(chatId, text, {disable_web_page_preview: true});
}

module.exports = newStatus;