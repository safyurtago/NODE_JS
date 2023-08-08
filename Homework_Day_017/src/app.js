const {Bot, InlineKeyboard, InputFile} = require('grammy');
const axios = require('axios');

const config = require('../config');
const { isAuth } = require('./middleware/isAuth.middleware');
const IO = require('./utils/io')
const Datas = new IO(process.cwd() + '/database/datas.json') 

const bot = new Bot(config.BOT_TOKEN);

bot.use(isAuth)



bot.command('start', async (ctx) => {
    const keyboard = new InlineKeyboard()
    .text('Save data', 'save')
    .text('Get data', 'get')
    await ctx.reply("What do you want?", {
        reply_markup: keyboard,
    });
});

bot.callbackQuery("save", async (ctx) => {
    ctx.reply("Enter your data")
});


bot.callbackQuery("get", async (ctx) => {
    ctx.reply("Enter your id")
});


bot.on('message', async (ctx) => {
    const datas = await Datas.read()
    
    if (ctx.message.text) {
        console.log(ctx.message);
        const findData = datas.find(data => data[0] == ctx.message.text)
        if (findData) {
                if (findData[1] === "photo"){
                    ctx.replyWithPhoto(findData[0])
                }
                else if (findData[1] === "video"){
                    ctx.replyWithVideo(findData[0])
                }
                else {
                    ctx.reply(findData[1])
                }}
        else {
        const message = ctx.message
        const messageId = [message.message_id, `${message.text}`]
        const result = datas.length ? [... datas, messageId] : [messageId]
        await Datas.write(result)
        await ctx.reply("Your Data ID: " + messageId[0])
        }
    }

    else if (ctx.message.photo) {
        const photo = ctx.message.photo[ctx.message.photo.length - 1]; // Get the largest available photo size
        const photoID = [photo.file_id, "photo"]
        const result = datas.length ? [... datas, photoID] : [photoID]
        await Datas.write(result)
        await ctx.reply("Your Data ID: " + photoID[0])
    }     
    else if (ctx.message.video) {
        const video = ctx.message.video
        const videoID = [video.file_id, "video"]
        const result = datas.length ? [... datas, videoID] : [videoID]
        await Datas.write(result)
        await ctx.reply("Your Data ID: " + videoID[0])
    }  
});











bot.start();