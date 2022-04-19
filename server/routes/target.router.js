const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware')

//GET target route
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('target GET route');

    const queryText = `SELECT * FROM "target"
                       WHERE "user_id" = $1`
    const values = [req.user.id];

    pool.query(queryText, values)
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log('error in target GET', error);
        })
});

// POST target route
router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('target POST route');
    const queryText = `INSERT INTO "target" ("user_id", "description")
                       VALUES ($1, $2);
                       `;
    const values = [req.user.id, req.body.description];
    pool.query(queryText, values)
        .then(result => {
            res.sendStatus(201);
        }).catch(error => {
            console.log('target POST error:', error);
        })
});


module.exports = router;