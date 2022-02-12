// DB CONNECTION
const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

// GET
router.get('/',(req,res)=>{
    let queryText = 'SELECT * FROM "list" ORDER BY "id";';
    console.log(req.body);
    
    pool.query(queryText)

    .then((result)=>{
        res.send(result.rows);

    }).catch((err)=>{
        console.log('Error making query', queryText, err);
        res.sendStatus(418);
        
    })
})

// POST
router.post('/', (req, res) => {
    let newTodo = req.body
    console.log(newTodo);
    
    let sqlText = `
    INSERT INTO "list" ("todo", "complete") VALUES ($1, $2);`
    
    let todo = [newTodo.todo, false]
    pool.query(sqlText, todo)
        .then(results => {
            res.sendStatus(201)
        }).catch(err => {
            console.log('todo not added', err);
            res.sendStatus(500)
        })
})

// DELETE
router.delete('/:id', (req, res) => {
  let reqId = req.params.id;
  let queryText = 'DELETE FROM "list" WHERE "id" = $1;';
  pool.query(queryText, [reqId])
    .then ((result) => {
        console.log('Todo deleted');
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log('Error making database query', queryText, error);
        res.sendStatus(500)
    });
})

// PUT
router.put( '/:id', ( req, res )=>{
  console.log(req.params.id);
  console.log(req.body);

  let query = `UPDATE "list" SET complete=$1 WHERE id=$2;`;
  const values =[ req.body.complete, req.params.id ];
  pool.query( query, values ).then( (results)=>{
      res.sendStatus( 200 );
  }).catch( ( err )=>{
      console.log( 'error with update:', err );
      res.sendStatus( 500 );
  })
})

module.exports = router;