const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');

//GET exposure route ---------- TO-DO need to include target_id data
router.get('/', rejectUnauthenticated, (req, res) => {
  console.log('exposure GET router');

  // TODO: add WHERE clause for target_id passed from req.params once I figure out how I want to track target  
  const queryText = `SELECT "exposure".id, "exposure".user_id, "exposure".hierarchy_id, "hierarchy".rating, "hierarchy".description, "exposure".date, "exposure"."time", "exposure".duration, "exposure".pre_suds, "exposure".peak_suds, "exposure".post_suds, "exposure".notes  FROM "exposure"
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

router.delete('/:id', rejectUnauthenticated, (req, res) =>{
  console.log('exposure delete router id:', req.params.id);

  const queryText = `DELETE FROM "exposure"
                     WHERE "id"  = $1 and "user_id" = $2;
                     `;
  const values = [req.params.id, req.user.id];
  pool.query(queryText, values)
      .then(result => {
        res.sendStatus(200);
      }).catch(error => {
        console.log('error in exposure delete router:', error);
      })
})

router.put('/', rejectUnauthenticated, (req,res) =>{
  console.log('exposure router put req.body:', req.body);
  const exp = req.body;

  const queryText = `UPDATE "exposure"
                     SET "date" = $1, "time" = $2, "duration" = $3, "pre_suds" = $4, "peak_suds" = $5, 
                         "post_suds" = $6, "notes" = $7, "hierarchy_id" = $8
                     WHERE "id" = $9 AND "user_id" = $10;
                    `;
  const values = [exp.date, exp.time, exp.duration, exp.pre_suds, exp.peak_suds, exp.post, exp.notes, exp.hierarchy_id, exp.id, req.user.id ];
  pool.query(queryText, values)
    .then(result => {
      res.sendStatus(200);
    }).catch(error => {
      console.log('put exposure router error:', error);
    })
})

module.exports = router;
