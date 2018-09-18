const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        const queryText = `SELECT * FROM "car";`;
        pool.query(queryText)
            .then(response => res.send(response.rows))
             .catch(error => res.sendStatus(500));
    } else {
        res.sendStatus(401);
    }
});


/**
 * POST route template
 */
router.post('/', (req, res) => {
    console.log(req.body);
    if(req.isAuthenticated()) {
      const elfToAdd = req.body;
      const queryText = `INSERT INTO "item"
                          ("person_id", "description", "image_url")
                          VALUES ($1, $2, $3);`;
      pool.query(queryText, [req.user.id, elfToAdd.newElf.description, elfToAdd.newElf.url])
      .then((results) =>{
          res.send(results.rows);
      }).catch((error)=>{
          console.log('POST elf failed', error);
          res.sendStatus(500);
      });
    } else {
        res.sendStatus(403);
    }
      
});

module.exports = router;