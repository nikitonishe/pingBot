'use strict'

var request = require('request');

var ping = function(address){
	return new Promise(function(resolve, reject){
		request(address, (err,res)=>{
			var status = {};
			if(err){
				status.error = err;
				return resolve(status);
			}
			status.address= address;
			status.code = res.statusCode;
			status.message = res.statusMessage;
			resolve(status);
		})
	})
}

module.exports = ping;