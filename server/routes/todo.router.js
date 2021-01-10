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
todoRouter.post('/', (req, res) => {
    console.log('in POST request');
    let task = req.body;

    let queryText = `INSERT INTO "todo" ("task", "notes", "dueDate", "complete")
    VALUES ($1, $2, $3, 'incomplete');`;

    pool.query(queryText, [
        task.task,
        task.notes,
        task.dueDate
    ]).then((result) => {
        res.sendStatus(201);
    })
})
// PUT
todoRouter.put('/:id', (req, res) => {
    let status = req.body.complete;
    let id = req.params.id

    console.log('updated status of ', id);

    let queryText;
    console.log(status);
    if (status === 'complete') {
        queryText = `UPDATE "todo"
                    SET "complete" = 'incomplete'
                    WHERE "id" = $1;`;
    } else {
        queryText = `UPDATE "todo"
                    SET "complete" = 'complete'
                    WHERE "id" = $1;`;
    }


    pool.query(queryText, [id]).then((result) => {
        res.send(result.rows);
    }).catch(error => {
        console.log('error updating todo list', error);
        res.sendStatus(500);
    });
})

// DELETE
todoRouter.delete('/:id', (req, res) => {
    let id = req.params.id
    console.log('deleting item number ', id);
    
    const queryText = `DELETE FROM "todo" WHERE "id" = $1;`;

    pool.query(queryText, [id]).then((results) => {
        res.sendStatus(200);
    })
})

module.exports = todoRouter;