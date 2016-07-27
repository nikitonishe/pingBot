'use strict'

var Telegram = require('telegram-node-bot'),
	token = require('./config.json').token;

const tg = new Telegram.Telegram(token);

module.exports = tg;