const {Pool} = require('pg')
const clubs = require('./unique-clubs.json');

async function start() {
  const pool = new Pool();
  const client = await pool.connect();

  try {
    await client.query('BEGIN')

    for (const club of clubs) {
      const text = 'INSERT INTO competitors(name, similar_names, ligue_id, created_at, updated_at, code, country) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *'
      const values = [club.name, '', 1, new Date(), new Date(), club.code, club.country];

      await client.query(text, values);
    };

    await client.query('COMMIT')
  } catch (e) {
    await client.query('ROLLBACK')
    throw e;
  } finally {
    client.release();
  }

  await pool.end();
}

start();
