const express = require('express');
const api = express.Router();
const bodyParser = require('body-parser');
module.exports = api;

const db = require(`./db-datastore`);

//ALLOW ACCESS
api.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});


// GET ALL
api.get('/', (req, res) => {
  res.json(db.list());
});

// GET
api.get('/:id(\\w+)', async (req, res) => {
  try {
    const value = await db.get(req.params.id);
    if (!value) { 
      return res.send('0') 
    }
    res.send(value.toString());
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

// PUT
api.put('/:id(\\w+)', bodyParser.text(), async (req, res) => {
  try {
      await db.put(req.params.id, req.body);
      return res.send(req.body);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});


// POST
 api.post('/:id(\\w+)', bodyParser.text(), async (req, res) => {

  let value = parseInt(await db.get(req.params.id)) || 0;

  value += parseInt(req.body);
  
  try {
      await db.put(req.params.id, value);
      return res.send(value.toString());
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});


// DELETE
api.delete('/:id(\\w+)', bodyParser.text(), async (req, res) => {
  try {
    await db.delete(req.params.id);
    res.sendStatus(204);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});





