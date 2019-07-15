const request = require('superagent');

const bzhost = "https://apac.battle.net";

const getUserInfo = token => {
  request.get(bzhost + "/oauth/userinfo")
    .set("Authorization", `Bearer ${token}`)
    .then(res => {
      return res.body;
    })
    .catch(err => {
      console.error(err);
    });
}

const bzhost2 = "https://apac.api.blizzard.com"

const getSC2Profile = (account_id, token) => {
  request.get(bzhost2 + `/sc2/player/${account_id}`)
    .query({ access_token: token })
    .then(res => {

    })
}


module.exports = {
  getUserInfo,
  getSC2Profile,
}