const {Router} = require('@grammyjs/router')

const {requestContact, requestLocation, inlineKeyboard} = require('../helpers/register.helper')

const router = new Router((ctx) => ctx.session.step)

const begin = router.route('begin')
begin.on('message:text', async (ctx) => {
    console.log("salom");
    await ctx.reply('Enter your full name: ', {
        reply_markup: {
            remove_keyboard : true
        }
    })
    ctx.session.fullname = ctx.message.text;
    ctx.session.step = 'fullname';
})

const fullname = router.route('fullname')
fullname.on('message:text', async (ctx) => {
    await ctx.reply('Enter your age ')
    ctx.session.fullname = ctx.message.text;
    ctx.session.step = 'age';
})

const age = router.route('age')
age.on('message:text', async (ctx) => {
    await ctx.reply('What technologies do you use? ')
    ctx.session.age = ctx.message.text;
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
    ctx.session.phonenumber = ctx.message.contact.phone_number;
    ctx.session.step = 'location';
})


const location = router.route('location')
location.on('message:text', async (ctx) => {
// location.on(':location', async (ctx) => {
    await ctx.reply('Enter price ', {
        reply_markup: {
            remove_keyboard : true
        }
    })
    ctx.session.location = ctx.message.text;
    // ctx.session.location = ctx.message.location;
    ctx.session.step = 'price';
})

const price = router.route('price')
price.on('message:text', async (ctx) => {
    await ctx.reply('Enter profession ')
    ctx.session.price = ctx.message.text;
    ctx.session.step = 'profession';
})

const profession = router.route('profession')
profession.on('message:text', async (ctx) => {
    await ctx.reply('Time to apply: ')
    ctx.session.profession = ctx.message.text;
    ctx.session.step = 'timeapply';
})

const timeapply = router.route('timeapply')
timeapply.on('message:text', async (ctx) => {
    await ctx.reply('Your plans: ')
    ctx.session.timeapply = ctx.message.text;
    ctx.session.step = 'plan';
})

const plan = router.route('plan')
plan.on('message:text', async (ctx) => {
    await ctx.reply('Are you sure to confirm all informations? ', {
        reply_markup: {
            ... inlineKeyboard,
            resize_keyboard : true
        }
    })
    ctx.session.plan = ctx.message.text;
    plan.callbackQuery('yes', async (ctx) => {
        const result =`
👨‍💼 Ustoz: ${ctx.session.fullname}
🕑 Yosh: ${ctx.session.age}
📚 Texnologiya: ${ctx.session.technology}
🇺🇿 Telegram: ${ctx.from.id}
📞 Aloqa: ${ctx.session.phonenumber}
🌐 Hudud: ${ctx.session.location}
💰 Narxi: ${ctx.session.price}
👨🏻‍💻 Kasbi: ${ctx.session.profession}
🕰 Murojaat qilish vaqti: ${ctx.session.timeapply}
🔎 Maqsad: ${ctx.session.plan}
        `
        await ctx.reply(`Shogird Kerak: \n\n${result}`)
        ctx.session.step = '';
        
    })
})

module.exports = router