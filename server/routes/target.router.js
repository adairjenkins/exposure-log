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
    console.log('target POST route req.body:', req.body.fear);
    const queryText = `INSERT INTO "target" ("user_id", "fear")
                       VALUES ($1, $2);
                       `;
    const values = [req.user.id, req.body.fear];
    pool.query(queryText, values)
        .then(result => {
            res.sendStatus(201);
        }).catch(error => {
            console.log('target POST error:', error);
        })
});

router.put('/:id', rejectUnauthenticated, (req, res) =>{
    console.log('target router PUT req.params.id:', req.params.id)
    console.log('target router PUT req.body:', req.body)
    const queryText = `UPDATE "target"
                       SET "fear" = $1
                       WHERE "id" = $2 AND "user_id" = $3;`
    const values = [req.body]
})
module.exports = router;