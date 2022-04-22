const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware')

//GET hierarchy route -------- TO-DO need to include target_id data
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('hierarchy GET router');

    const queryText = `SELECT * FROM "hierarchy"
                 WHERE "user_id" = $1
                 ORDER BY "rating" DESC`; 
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

router.delete('/:id', rejectUnauthenticated, (req, res) => {
    console.log('hierarchy router delete id:', req.params.id);
    
    const queryText = `DELETE FROM "hierarchy"
                       WHERE "id" = $1 AND "user_id" = $2;
                       `;
    const values = [req.params.id, req.user.id];
    pool.query(queryText, values)
        .then(result => {
            res.sendStatus(200);
        }).catch(error => {
            console.log('error in hierarchy delete router:', error);
        })
})

router.put('/', rejectUnauthenticated, (req, res) => {
    console.log('hierarchy router put req.body:', req.body);

    const queryText = `UPDATE "hierarchy"
                       SET "description" = $1, "rating" = $2
                       WHERE "id" = $3 AND "user_id" = $4;
                       `;
    const values = [req.body.description, req.body.rating, req.body.id, req.user.id];
    pool.query(queryText, values)
        .then(result => {
            res.sendStatus(200)
        }).catch(error => {
            console.log('error in hierarchy put router', error);
        })
})

module.exports = router;