const {Router} = require('@grammyjs/router')

const {requestContact, requestLocation, inlineKeyboard} = require('../helpers/register.helper')

const router = new Router((ctx) => ctx.session.step)

const begin = router.route('begin')
begin.on('message:text', async (ctx) => {
    await ctx.reply('Enter Company name: ', {
        reply_markup: {
            remove_keyboard : true
        }
    })
    ctx.session.step = 'company';
})

const company = router.route('company')
company.on('message:text', async (ctx) => {
    await ctx.reply('What technologies do you use? ')
    ctx.session.company = ctx.message.text;
    ctx.session.step = 'technology';
})

const technology = router.route('technology')
technology.on('message:text', async (ctx) => {
    await ctx.reply('Enter your Phone Number ', {
        reply_markup: {
            ... requestContact,
            resize_keyboard : true
        }
    })
    ctx.session.technology = ctx.message.text;
    ctx.session.step = 'phonenumber';
})

const phonenumber = router.route('phonenumber')
phonenumber.on(':contact', async (ctx) => {
    await ctx.reply('Enter your Location ', {
        reply_markup: {
            remove_keyboard: true
        // ... requestLocation,
        //     resize_keyboard : true
        }  
    })
    ctx.session.phonenumber = ctx.message.contact;
    ctx.session.step = 'location';
})


const location = router.route('location')
location.on('message:text', async (ctx) => {
    await ctx.reply('Enter person contact ', {
        reply_markup: {
            remove_keyboard : true
        }
    })
    ctx.session.location = ctx.message.location;
    ctx.session.step = 'person';
})

const person = router.route('person')
person.on('message:text', async (ctx) => {
    await ctx.reply('Enter time to apply ')
    ctx.session.person = ctx.message.text;
    ctx.session.step = 'timeapply';
})

const timeapply = router.route('timeapply')
timeapply.on('message:text', async (ctx) => {
    await ctx.reply('Enter Job time: ')
    ctx.session.timeapply = ctx.message.text;
    ctx.session.step = 'jobtime';
})

const jobtime = router.route('jobtime')
jobtime.on('message:text', async (ctx) => {
    await ctx.reply('Salary: ')
    ctx.session.profession = ctx.message.text;
    ctx.session.step = 'salary';
})
const salary = router.route('salary')
salary.on('message:text', async (ctx) => {
    await ctx.reply('Additional Informations: ')
    ctx.session.addInfo = ctx.message.text
    ctx.session.step = 'addInfo'
})

const addInfo = router.route('addInfo')
addInfo.on('message:text', async (ctx) => {
    await ctx.reply('Are you sure to confirm all informations? ', {
        reply_markup: {
            ... inlineKeyboard,
            resize_keyboard : true
        }
    })
    ctx.session.addInfo = ctx.message.text;
    addInfo.callbackQuery('yes', async (ctx) => {
        const result =`
🏢 Idora: ${ctx.session.company}
📚 Texnologiya: ${ctx.session.technology}
🇺🇿 Telegram: ${ctx.from.id}
📞 Aloqa: ${ctx.session.phonenumber}
🌐 Hudud: ${ctx.session.location}
✍️ Mas'ul: ${ctx.session.person}
🕰 Murojaat vaqti: ${ctx.session.timeapply}
🕰 Ish vaqti: ${ctx.session.jobtime}
💰 Maosh: ${ctx.session.salary}
‼️ Qoshimcha: ${ctx.session.addInfo}
        `
        await ctx.reply(`Hodim Kerak: \n\n${result}`)
        ctx.session.step = '';
        
    })
})

module.exports = router