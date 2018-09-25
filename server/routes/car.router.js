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


//owner cars
router.get('/owner', (req, res) => {
  
    if (req.isAuthenticated()) {
        const queryText = `SELECT * FROM "car" WHERE "person_id" = $1;`;
        pool.query(queryText, [req.user.id])
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


router.post('/feedback', (req, res) => {
    console.log(req.body);
    if(req.isAuthenticated()) {
      const tripToAdd = req.body;
      const queryText = `INSERT INTO "trip" ("person_id","car_id", "rating", "review", "start_time",
                         "end_time")
                          VALUES ($1, $2, $3, $4, $5, $6)`;
      pool.query(queryText, [req.user.id, tripToAdd.car_id, tripToAdd.rating, tripToAdd.review,
                             tripToAdd.start_time, tripToAdd.end_time])
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




router.delete('/:id', (req, res) => {
    const idOfCartoDelete = req.params.id;
      console.log('deleting ', idOfCartoDelete);
      const queryText = 'DELETE FROM "car" WHERE "car_id" = $1;';
      pool.query(queryText, [idOfCartoDelete]).then((result) => {
          res.sendStatus(200);
      }).catch( (error) => {
          console.log('Error in delete', error);
          res.sendStatus(500);
      });
  });

  router.put('/garage/:id', (req, res) => {
    const  carToEdit = req.body.editCar;
    console.log('req.body:', carToEdit);
    const queryText = `UPDATE "car" SET "make" = $1, "model" = $2, "color" = $3, "year" = $4,
                       "city" = $5, "state" = $6, "image_path" = $7, "latitude" = $8,
                       "longitude" = $9 WHERE "car_id" = $10;`;
    pool.query(queryText,[carToEdit.make, carToEdit.model,
        carToEdit.color, carToEdit.year, carToEdit.city,
        carToEdit.state, carToEdit.image_path,
        carToEdit.latitude, carToEdit.longitude, req.params.id])
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log('Error on /api/cars/garage PUT:', error);
            res.sendStatus(500);
        })
});



router.put('/status/:id', (req, res) => {
    const  carToEdit = req.body.available;
    console.log('req.body:', carToEdit);
    const queryText = `UPDATE "car" SET "available" = $1 WHERE "car_id" = $2;`;
    pool.query(queryText,[carToEdit, req.params.id])
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log('Error on /api/cars/status PUT:', error);
            res.sendStatus(500);
        })
});


  

module.exports = router;