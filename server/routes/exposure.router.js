const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');

//GET route template
router.get('/', rejectUnauthenticated, (req, res) => {
  console.log('exposure GET router');

  const queryText = `SELECT * FROM "exposure"
                     WHERE "user_id" = $1`;
  const values = [req.user.id];

  pool.query(queryText, values) 
      .then(result =>  {
        res.send(result.rows);
      })
      .catch(error => {
        console.log('error in exposure GET', error);
      })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
