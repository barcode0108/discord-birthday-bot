
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

const config = {
  port: normalizePort(process.env.PORT || '3000'),
  blizzard_client_id: process.env.BZ_CLIENT_ID,
  blizzard_client_secret: process.env.BZ_CLIENT_SECRET,
  worker: process.env.WEB_CONCURRENCY || 1,
  discord_token: process.env.DISCORD_TOKEN,
  discord_command_prefix: '-'
};




module.exports = config;