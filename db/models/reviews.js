const client = require('../client');

async function createReview( {name, description, candleReviewedId, userReviewingId}) {
    
    try {
      const {rows:[review]} = await client.query(`
        INSERT INTO reviews(name, description, "candleReviewedId", "userReviewingId")
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `, [name, description, candleReviewedId, userReviewingId])

      return review;

    } catch (error) {
      console.error("Error creating candle")
       throw error;
    }
};

async function getAllReviews() {
  try{
    const { rows: reviews } = await client.query(`
      SELECT *
      FROM reviews;
    `);
    return reviews;
  } catch(error) {
    console.error("Error getting all reviews")
  }
};

module.exports = {
    createReview,
    getAllReviews
}