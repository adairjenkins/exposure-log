const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware')

//GET hierarchy route
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('hierarchy GET route')

    const queryText = `SELECT * FROM "hierarchy"
                 WHERE "user_id" = $1` 
    values = [req.user.id]
    
    pool.query(queryText, values)
        .then(result => {
            res.send(result.rows)
        })
        .catch(error => {
            console.log('error in hierarchy GET', error)
        })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;