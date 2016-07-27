'use strict'

var commonMessages = require('../messages/common');

var otherwiseController = function(TelegramBaseController){
	return class OtherwiseController extends TelegramBaseController{
		handle($){
			commonMessages($, 'other');
		}
	}
}

module.exports = otherwiseController;