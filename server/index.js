const express = require('express');
const axios = require('axios');
const db = require('../db/index.js');

const app = express();
const PORT = 3000 || process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));


//------------------------------------------------------------------------------
const sendResponse = function(err, data, res) {
  err ?
    res.status(500).send(err) :
    res.status(200).send(data);
}

// GET QUESTIONS
app.get('/shopdata/qa/questions', (req, res) => {
  const params = { product_id: req.query.product_id };
  db.getQuestions(params,
    (err, data) => sendResponse(err, data, res));
});

// GET ANSWERS
app.get('/shopdata/qa/answers', (req, res) => {
  const params = { question_id: req.query.question_id };
  db.getAnswers(params,
    (err, data) => sendResponse(err, data, res));
});

// MARK QUESTION AS HELPFUL
app.put('/shopdata/qa/questions/:id', (req, res) => {
  // to increment data, do we have to query it, increment it, and re-insert it?
  // is question_id in the body, or is it in the params?  I think it's in the body
  // eventually this needs to be user-specific so you can only do it once.  May need a users table.
});

// MARK ANSWER AS HELPFUL
app.put('/shopdata/qa/answers/:id/helpful', (req, res) => {
  // to increment data, do we have to query it, increment it, and re-insert it?
  // is answer_id in the body, or is it in the params?  I think it's in the body
  // eventually this needs to be user-specific so you can only do it once.  May need a users table.
});

// REPORT ANSWER
app.put('/shopdata/qa/answers/:id/report', (req, res) => {
  // should this be a "extract boolean and toggle it" or a "straight up PUT request as reported"?
  // thinking this shouldn't be user-specific
  // req.body.answer_id
});

// REPORT QUESTION
app.put('/shopdata/qa/questions/:id/report', (req, res) => {
  // should this be a "extract boolean and toggle it" or a "straight up PUT request as reported"?
  // thinking this shouldn't be user-specific
  // req.body.answer_id
});

// POST AN ANSWER
app.post('/shopdata/qa/answers/:id', (req, res) => {
});

// POST A QUESTION
app.post('/shopdata/qa/questions', (req, res) => {

});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});