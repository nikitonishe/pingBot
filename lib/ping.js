'use strict'

var request = require('request');

var ping = function(address){
	return new Promise(function(resolve, reject){
		request(address, (err,res)=>{
			var status = {};
			status.address= address;
			if(err){
				status.code = 0;
				status.error = err;
				return resolve(status);
			}
			status.code = res.statusCode;
			status.message = res.statusMessage;
			resolve(status);
		})
	})
}

module.exports = ping;