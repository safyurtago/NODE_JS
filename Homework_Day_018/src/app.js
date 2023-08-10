const {Bot, session} = require('grammy')
const config = require('../config')

const commandsModule = require('./modules/commands.module')


const bot = new Bot(config.token)


bot.use(session({initial: () => ({step: 'begin'})}))
bot.use(commandsModule)


bot.start()