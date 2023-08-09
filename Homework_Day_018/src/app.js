const {Bot, session} = require('grammy')
const config = require('../config')

const commandsModule = require('./modules/commands.module')
const collegueModule = require('./modules/collegue.module')
const workerModule = require('./modules/worker.module')
const jobModule = require('./modules/job.module')


const bot = new Bot(config.token)


bot.use(session({initial: () => ({step: 'begin'})}))
bot.use(commandsModule)


bot.start()