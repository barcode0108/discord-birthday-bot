const throng = require('throng')
const app = require('./app');
const config = require('./config');

const bot = require('./bot/bot');

bot.init();

// throng({
//   workers: config.worker,
//   lifetime: Infinity
// }, id => {
// })
let id = 1;
app.listen(config.port, () => console.log(`${id}: Listening on ${config.port}`))