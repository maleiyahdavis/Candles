const client = require('../client');

async function createCandle( name, description, price, scent_nameId ) {
    
      try {
        const {rows:[candle]} = await client.query(`
          INSERT INTO candles(name, description, price, scent_nameId)
          VALUES ($1, $2, $3, $4)
          ON CONFLICT (name) DO NOTHING
          RETURNING *;
        `, [name, description, price, scent_nameId])

  
        return candle;
  
      } catch (error) {
        console.error("Error creating candle")
         throw error;
      }
  }

  module.exports = {
      createCandle
  }