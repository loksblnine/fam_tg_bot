const TelegramAPI = require("node-telegram-bot-api");

// const {Canvas, Image} = require('canvas');
// const mergeImages = require('merge-images');

require('dotenv').config();
const db_config = require("./src/configs/db/config");
const GalleryController = require("./src/controllers/GalleryController");
// const UserModel = require("./src/configs/db/models/User");
const Gallery = require("./src/configs/db/models/Gallery");
const {getRandomInt} = require("./src/utils");

const token = process.env.API_TELEGRAM_HTTP_TOKEN;
const bot = new TelegramAPI(token, {polling: true});

const start = async () => {
  try {
    await db_config.authenticate();
    await db_config.sync();

    bot.setMyCommands([
      {command: '/start', description: 'Начальное приветствие'},
      {command: '/echo', description: 'шо ржем.'},
    ]);

  } catch (e) {
    console.log('Пизда бд, фикси:', e);
  }

  bot.on('new_chat_members', (msg) => {
    //add to db
    const {chat} = msg;
    const chatId = chat.id;
    bot.sendMessage(chatId, "Привет! Прежде, чем задавать вопросы, сначала пройдись по закрепленным сообщениям - там вся важная информация, проголосуй, пожалуйста, в опросах, в первом закрепленном есть faq - прочитай и изучи. Если после этого всего останутся вопросы - пиши, спрашивай - тут тебе на всё ответят.", {parse_mode: 'Markdown'});
  });

  bot.onText(/\/echo/, (msg) => {
    const {text, chat} = msg;
    const chatId = chat.id;
    bot.sendMessage(chatId, `haha ez ${text}`);
  });

  bot.onText(/\/start/, async (msg) => {
    const {chat} = msg;
    const chatId = chat.id;
    const randomed = getRandomInt(25) + 1;
    const photo = await GalleryController.getPhotoById(randomed);
    console.log(1234, photo);
    bot.sendPhoto(chatId, photo.url);
    bot.sendMessage(chatId, `а что ты надеялся тут увидеть`);
  });

  bot.onText(/\/refresh_db/, (msg) => {
    const {chat} = msg;
    const chatId = chat.id;
    //if no in db add
    bot.getChatMemberCount(chatId).then((resp) => {
      console.log(11, resp);
    });
  });

};

start();