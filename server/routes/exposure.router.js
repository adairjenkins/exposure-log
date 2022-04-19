const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');

//GET exposure route ---------- TO-DO need to include target_id data
router.get('/', rejectUnauthenticated, (req, res) => {
  console.log('exposure GET router');

  // TODO: add WHERE clause for target_id passed from req.params once I figure out how I want to track target  
  const queryText = `SELECT "exposure".id, "exposure".user_id, "hierarchy".rating, "hierarchy".description, "exposure".date, "exposure"."time", "exposure".duration, "exposure".pre_suds, "exposure".peak_suds, "exposure".post_suds, "exposure".notes  FROM "exposure"
                     JOIN "hierarchy" ON "hierarchy".id = "exposure".hierarchy_id
                     WHERE "exposure".user_id = $1
                     ORDER BY "exposure".date, "exposure"."time";
                     `; 
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
