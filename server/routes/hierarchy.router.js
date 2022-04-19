const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware')

//GET hierarchy route -------- TO-DO need to include target_id data
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('hierarchy GET router');

    const queryText = `SELECT * FROM "hierarchy"
                 WHERE "user_id" = $1`; 
    const values = [req.user.id];
    
    pool.query(queryText, values)
        .then(result => {
            res.send(result.rows)
        })
        .catch(error => {
            console.log('error in hierarchy GET', error)
        })
});

// hierarchy POST route
router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('hierarchy POST route req.body:', req.body);
    const queryText  = `INSERT INTO "hierarchy" ("user_id", "target_id", "description", "rating")
                        VALUES ($1, $2, $3, $4);
                        `;
    //FIXME : replace null with correct value on client side
    const values = [req.user.id, null, req.body.description, req.body.rating];
    pool.query(queryText, values)
        .then(result => {
            res.sendStatus(201);
        }).catch(error => {
            console.log('hierarchy POST error:', error);
        })                   
});

module.exports = router;