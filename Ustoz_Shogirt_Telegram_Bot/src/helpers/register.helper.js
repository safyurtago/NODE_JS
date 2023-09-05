const {Keyboard, InlineKeyboard} = require('grammy');

const requestContact = new Keyboard().requestContact('Send Phone Number')
const requestLocation = new Keyboard().requestLocation('Send Location')
const inlineKeyboard = new InlineKeyboard().text('yes', 'yes').text('no', 'no')

module.exports = {
    requestContact,
    requestLocation,
    inlineKeyboard
}