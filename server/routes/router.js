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

// router.post('/', (req, res) => {
//     let koala = req.body.koala
//     console.log(koala);
    

//     let sqlText = `
//     INSERT INTO "koala" ("name", "age", "gender", "ready", "notes") 
//     VALUES ( $1, $2, $3, $4, $5);`
    
//     let koalaStuff = [koala.name, koala.age, koala.gender, koala.readyForTransfer, koala.notes]
//     pool.query(sqlText, koalaStuff)
//         .then(results => {
//             res.sendStatus(201)
//         }).catch(err => {
//             console.log('this Koala is hecked', err);
//             res.sendStatus(500)
//         })
// })


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

// DELETE

module.exports = router;