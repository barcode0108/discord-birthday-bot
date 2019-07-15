const express = require('express');
const request = require('superagent');
const config = require('../config');
const { bot } = require('../bot/bot')


const router = express.Router();


router.get('/', (req, res, next) => {
  res.render('blizzard');
});

const bzhost = "https://apac.battle.net";


router.get('/oauth', (req, res, next) => {
  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl.split("?").shift();

  const url = bzhost + "/oauth/authorize" +
    "?client_id=" + config.blizzard_client_id +
    "&scope=sc2.profile" +
    "&state=" +
    "&response_type=code" +
    "&redirect_uri=" + fullUrl + "/callback";
  res.redirect(url);
  // res.send(JSON.stringify({ "redirect_url": url }));
});


router.get('/oauth/callback', (req, res, next) => {
  var code = req.query.code;

  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl.split("?").shift();


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
      bot.channels.find('name', 'test').send("Responce:\n" + JSON.stringify(resp.body))
    })
    .catch(err => {
      res.send("<script>window.close();</script>")
      console.log(err)
    })

});


module.exports = router;
