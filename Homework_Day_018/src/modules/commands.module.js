const {Composer} = require('grammy')
const { inlineKeyboard } = require('../buttons/main.button')
const collegueModule = require('./collegue.module')
const workerModule = require('./worker.module')
const jobModule = require('./job.module')


const bot = new Composer()

bot.command('start', (ctx) => {
  ctx.reply(`Assalom alaykum ${ctx.from.first_name}
  UstozShogird kanalining rasmiy botiga xush kelibsiz!`, {
    reply_markup: {
      ... inlineKeyboard,
      resize_keyboard: true
    }
  })
})

bot.callbackQuery('sherik', async (ctx) => {
  await ctx.reply('Enter any word to start:', {
    reply_markup: {
      remove_keyboard: true
    }
  })
  bot.use(collegueModule)
})

bot.callbackQuery('hodim', async (ctx) => {
  bot.use(workerModule)
})

bot.callbackQuery('ish', async (ctx) => {
  bot.use(jobModule)
})

bot.callbackQuery('ustoz', async (ctx) => {
  bot.use(teacherModule)
})

bot.callbackQuery('shogird', async (ctx) => {
  bot.use(studentModule)
})

module.exports = bot