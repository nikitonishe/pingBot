'use strict'

var request = require('request');

var ping = function(chatId, address){
	return new Promise(function(resolve, reject){
		request('http://' + address, (err,res)=>{
			var status = {};
			if(err){
				status.error = err;
				return resolve(status);
			}
			status.code = res.statusCode;
			status.Message = res.statusMessage;
			resolve(status);
		})
	})
}

module.exports = ping;