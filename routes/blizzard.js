const express = require('express');
const request = require('superagent');
const base64url = require('base64-url');
const config = require('../config');
const { bot } = require('../bot/bot');

const bz = require('../blizzard_api');


const router = express.Router();


const bzhost = "https://apac.battle.net";


router.get('/oauth', (req, res, next) => {
  const state = {
    user_id: req.query.user_id,
    channel_id: req.query.channel_id
  }

  const bs64 = base64url.encode(JSON.stringify(state), 'utf-8')

  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl.split("?").shift();

  const url = bzhost + "/oauth/authorize" +
    "?client_id=" + config.blizzard_client_id +
    "&scope=sc2.profile" +
    "&state=" + base64url.escape(bs64) +
    "&response_type=code" +
    "&redirect_uri=" + fullUrl + "/callback";
    
  res.redirect(url);
  // res.send(JSON.stringify({ "redirect_url": url }));
});


router.get('/oauth/callback', (req, res, next) => {
  var code = req.query.code;

  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl.split("?").shift();

  const param = JSON.parse(base64url.decode(base64url.unescape(req.query.state)));

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

      const info = bz.getUserInfo(resp.body.access_token)
      bot.channels.get(param.channel_id).send(`<@${param.user_id}> Battle Tag:${info.battletag}`)

    })
    .catch(err => {
      res.send("<script>window.close();</script>")
      console.log(err)
    })

});


module.exports = router;
