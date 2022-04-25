const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('goal GET route');

    const queryText = `SELECT * FROM "goal"
                       WHERE "user_id" = $1;
                       `;
    values = [req.user.id];
    pool.query(queryText, values)
        .then(result => {
            res.send(result.rows)
        }) .catch(error => {
            console.log('error in goal GET', error);
        })
});



module.exports = router;