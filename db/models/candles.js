const res = require('express/lib/response');
const client = require('../client');

async function createCandle( {name, description, price, imageURL, inStock, scent_nameId}) {
  
    
      try {
        const {rows:[candle]} = await client.query(`
          INSERT INTO candles(name, description, price, "imageURL", "inStock", "scent_nameId")
          VALUES ($1, $2, $3, $4, $5, $6)
          ON CONFLICT (name) DO NOTHING
          RETURNING *;
        `, [name, description, price, imageURL, inStock,scent_nameId])

  
        return candle;
  
      } catch (error) {
        console.error("Error creating candle")
         throw error;
      }
  }

  async function getAllCandles() {
    try{
      const {rows:candles} = await client.query(`
        SELECT * 
        FROM candles;
      `);
      return candles;
    } catch(error) {
      console.error("Error getting all candles")
    }
  }

  async function getCandleById(id) {
    try {
      const {rows: [candle]} = await client.query(`
        SELECT * 
        FROM candles
        WHERE id = ${id};
      `)
      return candle
    } catch (error) {
      console.error("Error getting candle")
    }
  }


  module.exports = {
    getAllCandles,
    createCandle,
    getCandleById
  }