const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')
// DB CONNECTION


// GET
router.get('/',(req,res)=>{
    let queryText = 'SELECT * FROM "list";';
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
    INSERT INTO "list" ("todo", "complete") 
    VALUES ($1, $2);`
    
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
// koalaRouter.put('/:id', (req, res) => {
//     let idToUpdate = req.params.id;
//     console.log(idToUpdate);
//     console.log(req.body.boolean);
   
  
//     let sqlText = '';
  
//     if (req.body.boolean === 'false') {
//      sqlText = `
//      UPDATE "koala" 
//      SET "ready" = 'true'
//      WHERE "id" = $1;
//     ` 
//     } 
//     else {
//         //bad req...
//         res.sendStatus(418)
//         // NOTHING ELSE HAPPENS
//         return;
//     }
  
//     let sqlValues = [idToUpdate];
//     pool.query(sqlText, sqlValues)
//     .then(result => {
//      res.sendStatus(200)
//     })
//     .catch(error => {
//      console.log(err);
//      console.log(500);
//     })
//   })



module.exports = router;