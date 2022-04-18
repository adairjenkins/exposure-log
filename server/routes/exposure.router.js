const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');

//GET exposure route ---------- TO-DO need to include target_id data
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

// POST exposure route
router.post('/', rejectUnauthenticated, (req, res) => {
  console.log('exposure POST route req.body:', req.body);

  const queryText = `INSERT INTO "exposure" ("user_id", "hierarchy_id", "date", 
                                             "time", "duration", "pre_suds", 
                                             "peak_suds", "post_suds", "notes")
                     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);
                     `;
  const values = [req.user.id, req.body.hierarchy_id, req.body.date, req.body.time, 
                  req.body.duration, req.body.pre_suds, req.body.peak_suds, 
                  req.body.post_suds, req.body.notes];
  
  pool.query(queryText, values)
      .then(result => {
        res.sendStatus(201);
      }).catch(error => {
        console.log('exposure POST error', error);
      })

});

module.exports = router;
