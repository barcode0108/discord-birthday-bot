const express = require('express');
const request = require('superagent');
const config = require('../config');
const { bot } = require('../bot/bot')


const router = express.Router();


const bzhost = "https://apac.battle.net";





router.get('/oauth', (req, res, next) => {
  const state = {
    user_id: req.query.user_id,
    channel_id: req.query.channel_id
  }

  const bs64 = Buffer.from(JSON.stringify(state)).toString("base64");

  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl.split("?").shift();

  const url = bzhost + "/oauth/authorize" +
    "?client_id=" + config.blizzard_client_id +
    "&scope=sc2.profile" +
    "&state=" + bs64 +
    "&response_type=code" +
    "&redirect_uri=" + fullUrl + "/callback";
  res.redirect(url);
  // res.send(JSON.stringify({ "redirect_url": url }));
});


router.get('/oauth/callback', (req, res, next) => {
  var code = req.query.code;

  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl.split("?").shift();

  const param = JSON.parse(new Buffer(req.query.state, 'base64').toString('utf-8'));

  request.post(bzhost + "/oauth/token")
    .auth(config.blizzard_client_id, config.blizzard_client_secret)
    .type('form')
    .send({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: fullUrl,
      scope: "sc2.profile"
    })
    .then(resp => {
      res.send("<script>window.close();</script>")
      bot.channels.get(param.channel_id).send(`<@${param.user_id}>`)
    })
    .catch(err => {
      res.send("<script>window.close();</script>")
      console.log(err)
    })

});


module.exports = router;
