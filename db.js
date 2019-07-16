const { Pool } = require('pg');


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});


const getAllFrom = async (table) => {
  const client = await pool.connect();
  try {
    return client.query(`SELECT * FROM ${table}`);
  } finally {
    client.release();
  }
}


const addUser = async (discord_user_id, account_id, battle_tag, region_id, realm_id, profile_id, name) => {
  const string_id = `${region_id}-S2-${realm_id}-${profile_id}`;
  const table = 'userinfo';
  const client = await pool.connect();

  let query = `INSERT INTO ${table} 
                (discord_user_id, account_id, battle_tag, region_id, realm_id, profile_id, name, string_id)
                VALUES($1, $2, $3, $4, $5, $6, $7, $8) 
                ON CONFLICT (discord_user_id) DO UPDATE 
                SET account_id = EXCLUDED.account_id,
                    battle_tag = EXCLUDED.battle_tag,
                    region_id = EXCLUDED.region_id,
                    realm_id = EXCLUDED.realm_id,
                    profile_id = EXCLUDED.profile_id,
                    name = EXCLUDED.name,
                    string_id = EXCLUDED.string_id 
                RETURNING *`
  try {
    return client.query(query
      , [discord_user_id, account_id, battle_tag, region_id, realm_id, profile_id, name, string_id]);
  } finally {
    client.release();
  }
}


const updateUser = async (discord_user_id, obj) => {
  const keys = Object.keys(obj);
  const vals = Object.values(obj);

  vals.push(discord_user_id);

  let str = "";
  let idx = 1;

  for (const key of keys) {
    str += `${key} = $${idx}`;

    if (idx++ < keys.length) 
      std += ',';
  }

  try {
    return client.query(`UPDATE userinfo SET ${str} WHERE discord_user_id = $${idx}`, vals);
  } finally {
    client.release();
  }
}


module.exports = {
  getAllFrom,
  addUser,
  updateUser,
}