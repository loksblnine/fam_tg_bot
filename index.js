const TelegramAPI = require("node-telegram-bot-api");

// const {Canvas, Image} = require('canvas');
// const mergeImages = require('merge-images');

require('dotenv').config();
const db_config = require("./src/configs/db/config");
const GalleryController = require("./src/controllers/GalleryController");
const UserController = require("./src/controllers/UserController");
const Gallery = require("./src/configs/db/models/Gallery");
const Util = require("./src/services/Util");
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
    const {chat} = msg;
    const chatId = chat.id;
    // const filtered = Util.filterNonExist(msg.new_chat_members);
    // if (filtered.length) {
    const appliedString = Util.concatUserAppeal(msg.new_chat_members);
    bot.sendMessage(chatId, `Привет, ${appliedString}! Прежде, чем задавать вопросы, сначала пройдись по закрепленным сообщениям - там вся важная информация, проголосуй, пожалуйста, в опросах, в первом закрепленном есть [faq](https://docs.google.com/document/d/1gAQ9iU3qpi_rxzpzlhtqKlo7NXWuJpD5CRutI3jHtLk/) - прочитай и изучи. Если после этого всего останутся вопросы - пиши, спрашивай - тут тебе на всё ответят.`, {parse_mode: 'Markdown'});
    // }
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
    bot.sendPhoto(chatId, photo.url, {
      caption: "а что ты надеялся тут увидеть"
    });
  });

  bot.onText(/^\W*(?:\w+\b\W*){50,}/, async (msg) => {
    const {chat} = msg;
    const chatId = chat.id;
    bot.sendMessage(chatId, `[Дружище](tg://user?id=${msg.from.id}), судя по ответам тут и на подслушано, должно было стать понятно, что в твоем вопросе не хватает данных для внятного ответа. 1ый корпус - здание. Есть номер ректора, его приемной, пресс-службы, проходной, профкома, учебного отдела, приемной комиссии, разных кафедр которые там обитают. В теории, можно найти номер телефона уборщицы/уборщика. Уточни кто именно тебя интересует или чего ты хочешь добиться, и тогда мы попробуем помочь)`, {parse_mode: 'Markdown'});
  });

  bot.on('left_chat_member', (msg) => {
    const {chat} = msg;
    const chatId = chat.id;
    const messageId = msg.message_id;
    bot.deleteMessage(chatId, messageId);
    bot.sendPhoto(chatId, 'https://www.streamscheme.com/wp-content/uploads/2022/02/sadge-600.png', {
      caption: `Есть пробитие`
    });
  });

};

start();