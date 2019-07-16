const request = require('superagent');

const bzhost = "https://apac.battle.net";

const getUserInfo = async token => {
  const res = await request.get(bzhost + "/oauth/userinfo")
    .set("Authorization", `Bearer ${token}`);

  return res.body
}

const bzhost2 = "https://tw.api.blizzard.com"

const getSC2Profile = async (account_id, token) => {
  const res = await request.get(bzhost2 + `/sc2/player/${account_id}`)
    .query({ access_token: token });

  for (const obj of res) {
    if (obj.regionId == 3 && obj.realmId == 2) {
      return obj;
    }
  }
}



module.exports = {
  getUserInfo,
  getSC2Profile,
}