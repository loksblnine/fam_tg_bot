const TelegramAPI = require("node-telegram-bot-api");
require('dotenv').config();

const token = process.env.API_TELEGRAM_HTTP_TOKEN;

const bot = new TelegramAPI(token, {polling: true});

const start = () => {

  bot.on('new_chat_members', (msg) => {
    const {chat} = msg;
    const chatId = chat.id;
    bot.sendMessage(chatId, "__Welcome message!__");
  });
};

start();