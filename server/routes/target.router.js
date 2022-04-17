const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware')

//GET target route
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('target GET route');

    const queryText = `SELECT * FROM "target"
                       WHERE "user_id" = $1`
    values = [req.user.id];

    pool.query(queryText, values)
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log('error in target GET', error);
        })
})


module.exports = router;