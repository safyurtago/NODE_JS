const {InlineKeyboard} = require('grammy');

const inlineKeyboard =  new InlineKeyboard().text('Sherik Kerak', 'sherik').text('Ish Joyi Kerak', 'ish').row()
.text('Hodim Kerak', 'hodim').text('Ustoz Kerak', 'ustoz').row()
.text('Shogird Kerak', 'shogird')


module.exports = {
    inlineKeyboard
}