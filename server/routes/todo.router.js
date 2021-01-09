const express = require('express');
const todoRouter = express.Router();

// DB CONNECTION
const pool = require('../modules/pool.js')

// GET
todoRouter.get('/', (req, res) => {
    let queryText = `SELECT * FROM "todo" ORDER BY "id";`;
    pool.query(queryText).then(result => {
        res.send(result.rows);
    }).catch(error => {
        console.log('error getting todo list', error);
        res.sendStatus(500);
      });
})

// POST


// PUT
todoRouter.get('/:id', (req, res) => {
    let complete = req.body.complete;
    let id = req.params.id
    
    let queryText = `SELECT * FROM "todo" ORDER BY "id";`;

    pool.query(queryText).then(result => {
        res.send(result.rows);
    }).catch(error => {
        console.log('error getting todo list', error);
        res.sendStatus(500);
      });
})

// DELETE

module.exports = todoRouter;