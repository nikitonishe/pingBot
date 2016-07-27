'use strict'

var commonMessages = require('../messages/common');

var startController = function(TelegramBaseController){
	return class StartController extends TelegramBaseController { 
	    startHandler($) {
	    	commonMessages($, 'start');
	    }

	    get routes() {
	        return {
	            '/start': 'startHandler'
	        }
	    }
	}
}

module.exports = startController;