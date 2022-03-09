const express = require('express');
const axios = require('axios');
const db = require('../db/index.js');

const app = express();
const PORT = 3000 || process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));

const sendResponse = function(err, data, res) {
  err ?
    res.status(500).send(err) :
    res.status(200).send(data);
}

function groupOnProperty (array, property) {
  result = {};
  array.forEach( (entry) => {
      if(!result[entry[property]]) {
          result[entry[property]] = [];
      }
      result[entry[property]].push(entry);
  })
  return result;
}

function arrangeQuestionData (questions, answers, photos) {
  let answer_pool = groupOnProperty(answers, 'id_questions');
  let photo_pool = groupOnProperty(photos, 'id_answers');

  answers.forEach((a) => a.photos = photo_pool[a.id] || []);
  questions.forEach((q) => q.answers = answer_pool[q.id] || []);
  return questions;
}

function arrangeAnswerData (answers, photos) {
  let photo_pool = groupOnProperty(photos, 'id_answers');

  answers.forEach((a) => a.photos = photo_pool[a.id] || []);
  return answers;
}

// GET QUESTIONS
app.get('/shopdata/qa/questions', async (req, res) => {
  let product_ids = [ req.query.product_id ];

  let questions = await db.getQuestions({ product_ids });
  let answers = await db.getAnswers({ question_ids: questions.map((q)=>q.id) });
  let photos = await db.getPhotos({ answer_ids: answers.map((a)=>a.id)});

  res.send(arrangeQuestionData(questions, answers, photos));
});


// GET ANSWERS
app.get('/shopdata/qa/answers', async (req, res) => {
  let question_ids = [ req.query.question_id ];

  let answers = await db.getAnswers({ question_ids });
  let photos = await db.getPhotos({ answer_ids: answers.map((a)=>a.id)});

  res.send(arrangeAnswerData(answers, photos));
});

// MARK QUESTION AS HELPFUL
app.put('/shopdata/qa/questions/helpful', (req, res) => {
  const params = { question_id: req.body.question_id }
  db.putQuestionHelpful(params,
    (err, data) => sendResponse(err, data, res));
});

// MARK ANSWER AS HELPFUL
app.put('/shopdata/qa/answers/helpful', (req, res) => {
  const params = { answer_id: req.body.answer_id }
  db.putAnswerHelpful(params,
    (err, data) => sendResponse(err, data, res));
});

// REPORT QUESTION
app.put('/shopdata/qa/questions/report', (req, res) => {
  const params = { question_id: req.body.question_id }
  db.putQuestionReported(params,
    (err, data) => sendResponse(err, data, res));
});

// REPORT ANSWER
app.put('/shopdata/qa/answers/report', (req, res) => {
  const params = { answer_id: req.body.answer_id }
  db.putAnswerReported(params,
    (err, data) => sendResponse(err, data, res));
});

// POST A QUESTION
app.post('/shopdata/qa/questions', (req, res) => {
  const params = {
    product_id: req.body.product_id,
    body: req.body.body,
    date_written: Date.parse(new Date()),
    asker_name: req.body.asker_name,
    asker_email: req.body.asker_email,
   }
  db.postQuestion(params,
    (err, data) => sendResponse(err, data, res));

});

// POST AN ANSWER
app.post('/shopdata/qa/answers', (req, res) => {
  const params = {
    id_questions: req.body.question_id,
    body: req.body.body,
    date_written: Date.parse(new Date()),
    answerer_name: req.body.answerer_name,
    answerer_email: req.body.answerer_email,
   }
  db.postAnswer(params,
    (err, data) => sendResponse(err, data, res));
});

app.listen(PORT, () => {
  // console.log(`Server listening on port: ${PORT}`);
});

module.exports.app = app;