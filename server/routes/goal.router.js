const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');

router.put('/', rejectUnauthenticated, (req, res) => {
    console.log('goal PUT route');

    const queryText = `UPDATE "user"
                       SET "weekly_goal" = $1, "daily_goal" = $2
                       WHERE "id" = $3;
                       `;
    const values = [req.body.weeklyGoal, req.body.dailyGoal, req.user.id];
    pool.query(queryText, values)
        .then(result => {
            res.sendStatus(200);
        }).catch(error => {
            console.log('error in goal PUT', error);
        })
});

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('goal GET route');

    const queryText = `SELECT "weekly_goal".user, "daily_goal".user FROM "user"
                       WHERE "id" = $1;
                       `;
    const values = [req.user.id];
    pool.query(queryText, values)
        .then(result => {
            res.send(result.rows);
        }).catch (error => {
            console.log('error goal GET:', error);
        })
})



module.exports = router;