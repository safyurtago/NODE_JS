const {Bot} = require('grammy');

const distance = require('./distance');

const bot = new Bot('6342700195:AAHxuLLYRUjKBWMh0Q_NYMQ9xNwa1HfS_Ek');

bot.command('start', async (ctx) => {
    await ctx.reply('Hello, Please enter your location: ', {
        parse_mode: "HTML",
    });
});

bot.on(':location', async (ctx) => {
    const {latitude, longitude} = ctx.message.location;
    const result = distance(latitude, longitude, 41.285996, 69.203431)
    await ctx.reply(result)
})

bot.start();