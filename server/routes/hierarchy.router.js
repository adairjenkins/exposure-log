const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//GET hierarchy route
router.get('/', (req, res) => {
  console.log('hierarchy GET route')
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;