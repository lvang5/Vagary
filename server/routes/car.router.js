const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    console.log(req.query.city);
    // if (req.isAuthenticated()) {
        const queryText = `SELECT * FROM "car" WHERE "city" ILIKE $1;`;
        pool.query(queryText, [req.query.city])
            .then(response => res.send(response.rows))
             .catch(error => res.sendStatus(500));
    // } else {
    //     res.sendStatus(401);
    // }

});


/**
 * POST route template
 */
router.post('/', (req, res) => {
    console.log(req.body.newCar);
    if(req.isAuthenticated()) {
      const carToAdd = req.body.newCar;
      const queryText = `INSERT INTO "car" ("person_id", "make", "model",
                         "color", "year", "city", "state", "image_path", 
                         "latitude", "longitude")
                          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;
      pool.query(queryText, [req.user.id, carToAdd.make, carToAdd.model,
                             carToAdd.color, carToAdd.year, carToAdd.city,
                             carToAdd.state, carToAdd.image_path,
                             carToAdd.latitude, carToAdd.longitude])
      .then((results) =>{
          res.send(results.rows);
      }).catch((error)=>{
          console.log('POST failed', error);
          res.sendStatus(500);
      });
    } else {
        res.sendStatus(403);
    }
      
});

module.exports = router;