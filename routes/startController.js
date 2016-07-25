'use strict'

var startController = function(TelegramBaseController){
	return class StartController extends TelegramBaseController { 
	    startHandler($) {
	    	require('../messages/common')($, 'start');
	    }

	    get routes() {
	        return {
	            '/start': 'startHandler'
	        }
	    }
	}
}

module.exports = startController;